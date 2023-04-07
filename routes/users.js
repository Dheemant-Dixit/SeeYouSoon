const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('authentication.ejs')
});

router.post('/register', catchAsync(async (req, res, next) => {
    console.log("hi i am here");
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            console.log("hi ai a");
            // res.render('main/home');
            res.redirect('/');
        })
    } catch (e) {
        alert(e.message);
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('authentication');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/profiles';
    delete req.session.returnTo;
    res.render('main/home');
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/profiles');
})

module.exports = router;