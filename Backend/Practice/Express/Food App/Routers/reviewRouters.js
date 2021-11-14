const express= require('express')
const planRouter = express.Router();

const {protectRoute, isAuthorized} = require('../controller/authController')

reviewRouter
    .route('/all')
    .get(getAllReviews);

reviewRouter
    .route('/top3')
    .get(top3reviews)

    reviewRouter
    .route('/:id')
    .get(getPlanReviews)
    
    
reviewRouter.use(protectRoute)
reviewRouter
    .route('/modify')
    .post(createReview)

reviewRouter.use(isAuthorized['admin'])
reviewRouter
    .route('/modify/:id')
    .patch(updateReview)
    .delete(deleteReview)

module.exports = reviewRouter