const express=require('express');
const router=express.Router({mergeParams:true});
const catchAsync=require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review=require('../models/review');
const {reviewSchema}=require('../Schema');
const {validateReview,isLoggedIn,isReviewAuthor}=require('../middleware');
const reviews=require('../controllers/review');

router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports=router;