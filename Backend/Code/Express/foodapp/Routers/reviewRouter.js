const express = require('express');
const {protectRoute, isAuthorized} = require('../controller/authController');

const reviewRouter = express.Router();
const {getAllReviews, top3Reviews, getPlanReviews, createReview, updateReview, deleteReview} = require('../controller/reviewContoller');


reviewRouter
    .route("/all")
    .get(getAllReviews)

reviewRouter
    .route("/top3")
    .get(top3Reviews)

reviewRouter
    .route("/:plan")
    .get(getPlanReviews)

reviewRouter.use(protectRoute)
reviewRouter
    .route("/reviewAction/:plan")
    .post(createReview)
    .patch(updateReview)
    .delete(deleteReview)



module.exports = reviewRouter;