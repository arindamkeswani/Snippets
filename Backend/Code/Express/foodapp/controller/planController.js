const planModel = require('../models/planModel');

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            return res.json({
                message: "List of plans.",
                data: plans
            })
        }
        else {
            return res.json({
                message: "Plans not found."
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getPlan = async function getPlan(req, res) {

    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);

        if (id) {
            return res.json({
                message: "Here is your plan.",
                data: plan
            })
        }
        else {
            return res.json({
                message: "Plans not found."
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.createPlan = async function createPlan(req, res) {

    try {
        let planData = req.body;
        let createdPlan = await planModel.create(planData);
        return res.json({
            message: "Plan created successfully.",
            data: createdPlan
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        return res.json({
            message: "Plan deleted successfully.",
            data: deletedPlan
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id
        let plan = await planModel.findById(id);
        let dataToBeUpdated = req.body;

        let keys = []
        for (key in dataToBeUpdated) {
            keys.push(key)
        }

        for (let i = 0; i < keys.length; i++) {
            plan[keys[i]] = dataToBeUpdated[keys[i]];
        }

        await plan.save();

        res.json({
            message: "Plan updated successfully.",
            data: plan
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.top3plans = async function top3plans(req, res) {
    try{
        const topThreePlans = await planModel.find().sort({
            ratingsAverage: -1
        }).limit(3);

        res.json({
            messgae: "Top 3 plans",
            data: topThreePlans
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}