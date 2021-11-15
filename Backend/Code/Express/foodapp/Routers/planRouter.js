const express = require('express');
const planRouter = express.Router();
const planModel = require('../models/planModel');
const {isAuthorized, protectRoute} = require('../controller/authController');
const {getAllPlans, getPlan, updatePlan, deletePlan, createPlan, top3plans} = require('../controller/planController');


planRouter.route('/allPlans')
    .get(getAllPlans)


planRouter.route('/top3')
    .get(top3plans)      
    
planRouter.use(protectRoute)
planRouter
    .route('/plan/:id')
    .get(getPlan)


planRouter.use(isAuthorized(['admin', 'restaurantOwner']))
planRouter
    .route('/alterPlan')
    .post(createPlan)

planRouter
    .route('/alterPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan)

module.exports = planRouter;