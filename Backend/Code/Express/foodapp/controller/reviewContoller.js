const reviewModel = require('../models/reviewModel');
const planModel = require('../models/planModel');


module.exports.getAllReviews = async function (req, res) {
    try {
        const reviews = await reviewModel.find();

        if (reviews) {
            return res.json({
                message: "List of reviews:",
                data: reviews
            })
        }
        else {
            return res.json({
                message: "Reviews not found.",
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.top3Reviews = async function (req, res) {
    try {

        let topThreeReviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3);

        if (topThreeReviews) {
            res.json({
                message: "Top 3 reviews.",
                data: topThreeReviews
            })
        }
        else {
            res.json({
                message: "Could not retrieve top 3 reviews at this time."
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        let planID = req.params.plan;
        let reviews = await reviewModel.find();
        reviews = reviews.filter(reviews => reviews.plan["_id"] == planID)

        if (reviews) {
            res.json({
                message: "Reviews for a certain plan.",
                data: reviews
            })
        } else {
            res.json({
                message: "Reviews not found for this plan.",
            })
        }

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.createReview = async function createReview(req,res){
    try{
        let planID = req.params.plan
        let plan = await planModel.findById(planID);
        let createdReview = await reviewModel.create(req.body);
        plan.ratingsAverage = (plan.ratingsAverage*plan.noOfReviews + req.body.rating) / (plan.noOfReviews+1);
        plan.noOfReviews = plan.noOfReviews+1;
        await plan.save();

        res.json({
            message: "Review created successfully.",
            data: createdReview
        });
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.updateReview = async function updateReview(req,res){
    try{
        let planID = req.params.plan;
        let id = req.body.id
        let plan = await planModel.findById(planID);
        let review = await reviewModel.findById(id);

        let dataToBeUpdated = req.body;

        let keys = []

        for(let key in dataToBeUpdated){
            if(key=="id") continue;
            keys.push(key);
        }

        for(let i = 0; i< keys.length; i++){
            review[keys[i]] = dataToBeUpdated[keys[i]]
        }

        await review.save();

        res.json({
            message: "Data updated successfully.",
            data: review
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }

}
    
module.exports.deleteReview = async function deleteReview(req,res){
    try{
        let planID = req.params.plan;
        let id = req.body.id
        let plan = await planModel.findById(planID);
        let review = await reviewModel.findById(id);

        let newNoOfReviews = (plan.noOfReviews <=0)? 0: plan.noOfReviews-1;

        plan.ratingsAverage = (newNoOfReviews == 0||plan.noOfReviews == 0)? 5 : (plan.ratingsAverage*plan.noOfreviews - review.rating) / (newNoOfReviews);
        
        plan.noOfReviews = newNoOfReviews;
        await plan.save();
        await reviewModel.findByIdAndDelete(id);

        res.json({
            message: "Data deleted successfully.",
            data: review
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }

}