const reviewModel = require('../models/reviewModel');
const planModel = require('../models/planModel');
const { updatePlan } = require('./planController');

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


module.reviews.top3reviews = async function top3reviews(req, res) {
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

module.reviews.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        let id = req.params.id;
        const review = await reviewModel.findById(id);

        if (review) {
            return res.json({
                message: "Review",
                data: review
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

module.exports.createPlan = async function createPlan(req, res) {
    try {
        let id = req.params.plan;
        let plan = await planModel.findById(id);
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
        let id = req.params.id;
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

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.plan;
        let plan = await planModel.findByIdAndDelete(id);
        let createdReview = await reviewModel.create(req.body);
        plan.ratingsAverage = (plan.ratingsAverage * plan.noOfReviews + req.body.rating) / (plan.noOfReviews + 1) //update it properly
        plan.noOfReviews = plan.noOfReviews + 1;
        await plan.save();

        res.json({
            message: "Review deleted.",
            data: createdReview
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}