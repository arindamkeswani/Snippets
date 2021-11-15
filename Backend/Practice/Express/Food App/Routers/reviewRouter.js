const express= require('express')
const reviewRouter = express.Router();

const {protectRoute, isAuthorized} = require('../controller/authController')
const {getAllReviews, top3reviews, getPlanReviews, createReview, updateReview, deleteReview} = require('../controller/reviewController');
reviewRouter
    .route('/all')
    .get(getAllReviews);

reviewRouter
    .route('/top3')
    .get(top3reviews)

    reviewRouter
    .route('/:plan')
    .get(getPlanReviews)
    
    
reviewRouter.use(protectRoute)
reviewRouter
    .route('/reviewAction/:plan')
    .post(createReview)
    .patch(updateReview)
    .delete(deleteReview)

// reviewRouter.use(isAuthorized(['admin']))
// reviewRouter
//     .route('/reviewAction/:id')

module.exports = reviewRouter