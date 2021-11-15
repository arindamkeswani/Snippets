const reviewModel = require('../models/reviewModel');
const planModel = require('../models/planModel');
// const { updatePlan } = require('./planController');

module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        const reviews = await reviewModel.find();
        if (reviews) {
            return res.json({
                message: "Reviews retrieved.",
                data: reviews
            })
        }
        else {
            return res.json({
                message: "Review not found."
            })
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        })
    }
}


module.exports.top3reviews = async function top3reviews(req, res) {
    try {
        const topThreeReviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3);

        if (topThreeReviews) {
            return res.json({
                message: "Top 3 reviews",
                data: topThreeReviews
            })
        }
        else {
            return res.json({
                message: "Cannot retrieve top 3 reviews at this time.",
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        
        let planID = req.params.plan;
        // let plan = await planModel.findById(planID);
        let reviews = await reviewModel.find();
        reviews=reviews.filter(reviews=>reviews.plan["_id"]==planID);
        if (reviews) {
            return res.json({
                message: "Reviews",
                data: reviews
            })
        }
        else {
            return res.json({
                message: "Cannot retrieve review at this time.",
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports.createReview = async function createPlan(req, res) {
    try {
        let planID = req.params.plan;
        let plan = await planModel.findById(planID);

        let createdReview = await reviewModel.create(req.body);
        plan.ratingsAverage = (plan.ratingsAverage * plan.noOfReviews + req.body.rating) / (plan.noOfReviews + 1) //update it properly
        plan.noOfReviews = plan.noOfReviews + 1;
        await plan.save();
        

        res.json({
            message: "Review created.",
            data: createdReview
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports.updateReview = async function updateReview(req, res) {

    try {
        let planID = req.params.plan;
        let id = req.body.id;
        let review = await reviewModel.findById(id);

        let dataToBeUpdated = req.body;

        let keys = [];
        for (let key in dataToBeUpdated) {
            if (key == id) continue;
            keys.push(key);
        }
        for (let i = 0; i < keys.length; i++) {
            review[keys[i]] = dataToBeUpdated[keys[i]];
        }
        await review.save();
        return res.json({
            message: 'Review updated successfully.',
            data: review
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
    })
    }
}

module.exports.deleteReview = async function deletePlan(req, res) {
    // try {
        let planID = req.params.plan;
        let id = req.body.id;
        let reviewToBeDeleted = await reviewModel.findById(id);
        let plan = await planModel.findById(planID);
        // console.log(reviewToBeDeleted);
        // console.log(plan);
        let newNumOfReviews = (plan.noOfReviews - 1 <= 0)? 0: plan.noOfReviews-1;
        // console.log(newNumOfReviews, plan.noOfReviews, plan.noOfReviews, reviewToBeDeleted.rating);
        plan.ratingsAverage = (newNumOfReviews==0 || plan.noOfReviews ==0)? 5: ((plan.ratingsAverage*plan.noOfReviews - reviewToBeDeleted.rating) / (newNumOfReviews)) //update it properly
        
        plan.noOfReviews = newNumOfReviews;
        await plan.save();
        await reviewModel.findByIdAndDelete(id);

        res.json({
            message: "Review deleted.",
            data: reviewToBeDeleted
        });
    // }
    // catch (err) {
    //     return res.status(500).json({
    //         message: err.message
    //     })
    // }
}