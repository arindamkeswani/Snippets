const express= require('express')
const planRouter = express.Router();
const {protectRoute, isAuthorized} = require('../controller/authController')


//will retrieve all plans
planRouter.route('/allPlans')
.get(getAllPlans)

//own plan, necessary to log-in
planRouter.use(protectRoute);
planRouter
.route('plan/:id')
.get(getPlan)


//Only admin and restaurant owner are allowed to perform following operations
planRouter.use(isAuthorized(['admin', 'restaurantOwner']))
planRouter
    .route('alterPlan')
    .post(createPlan)
    .patch(updatePlan)
    .delete(deletePlan)
