const plaModel = require('../models/planModel')


module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await model.find();
        if (plans) {
            return res.json({
                message: "All plans retrieved",
                data: plans
            })
        }
        else {
            return res.json({
                message: "Plans not found"
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
        let plan = await model.findById();
        if (id) {
            return res.json({
                message: "Plan retrieved.",
                data: plan
            })
        }
        else {
            return res.json({
                message: "Plan not found"
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
        let createdPlan = await planModel.createPlan(planData);
        return res.json({
            message: "Plan created successfully.",
            plan: createdPlan
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
            plan: deletedPlan
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


        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = []
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }
        let plan = await planModel.findById(id);

        for (let key in keys) {
            plan[keys] = dataToBeUpdated[key];
        }

        await plan.save();
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

//top 3 plans
module.exports.top3plans = async function top3plans(req,res){
    try{
        const topThreePlans = await planModel.find().sort({
            ratingsAverage: -1 //desc order
        }).limit(3);
        //sort on basis of ratings

        return res.json({
            message: "Top 3 plans",
            data: topThreePlans
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}