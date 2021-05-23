const db = require('../models/db.js');
const Howl = require('../models/HowlModel.js');
const {Profile} = require('../models/OkamiModel.js');
const {Okami} = require('../models/OkamiModel.js');

const controller = {

    /**
     * getIndex.
     * 
     * renders the homepage.
     * @param {*} req 
     * @param {*} res 
     */
    getIndex: function(req, res) {
        res.render('index', {});
    },

    /**
     * getProfile.
     * 
     * renders the logged in account's profile.
     * @param {*} req 
     * @param {*} res 
     */
    getProfile: function(req, res) {
        res.render('profile', {
            name: 'tantu',
            bio: 'uhm',
            about: 'just a gamer'
        });
    },

    /**
     * getSignUp.
     * 
     * renders the sign up page.
     * @param {*} req 
     * @param {*} res 
     */
    getSignUp: function(req, res) {
        res.render('signup', {});
    },

    /**
     * getHowl.
     * 
     * adds a howl to the database.
     * @param {*} req 
     * @param {*} res 
     */
    getHowl: function(req, res) {

    },

    /**
     * postLogIn.
     * 
     * renders the log in page.
     * @param {*} req 
     * @param {*} res 
     */
    postLogIn: function(req, res) {

    },

    /**
     * postSignUp.
     * 
     * signs up a user and adds the user to the database.
     * @param {*} req 
     * @param {*} res 
     */
    postSignUp: function(req, res) {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var password = req.body.password;
        
        Okami.countDocuments({}, function(err, count) {
            var str = "" + count;
            var pad = "00000000";
            var okamid = pad.substring(0, pad.length - str.length) + str;

            var profile = new Profile({
                about: '',
                bio: 'has not set',
                followers: 0
            });

            var okami = new Okami({
                okamid: okamid,
                name: {
                    first: firstname,
                    last: lastname
                },
                email: email,
                password: password,
                profile: profile
            });

            okami.save();
            res.send(okami);
        })
        
    },
}

module.exports = controller;
