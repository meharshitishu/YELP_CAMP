const Campground = require('../models/campground');

module.exports.index=async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.renderNewForm=(req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground=async (req, res) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground data', 400);
    const {id}=req.params;
    const campground = new Campground(req.body.campground);
    campground.author=req.user.id;
    await campground.save()
    req.flash('success','Successfully made a new campground');
    res.redirect(`/campgrounds/${campground.id}`);
}

module.exports.showCampground=async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    if(!campground){
        req.flash('error','Cannot find the campground')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm=async (req, res) => {
    const { id } = req.params;
    const campground=await Campground.findById(id);
    if(!campground){
        req.flash('error','Cannot edit the campground')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground=async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success','Successfully updated the campground')
    res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.deleteCampground=async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted Campground')
    res.redirect('/campgrounds');
}