const db = require('../models/db.js');
const {Echo} = require('../models/HowlModel.js');
const {Howl} = require('../models/HowlModel.js');
const {Profile} = require('../models/OkamiModel.js');
const {Okami} = require('../models/OkamiModel.js');
const {render} = require('../routes/routes.js');

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
        const sess = req.session;

        console.log(sess.okami.email);

        res.render('profile', {
            name: sess.okami.name.first,
            bio: sess.okami.profile.bio,
            about: sess.okami.profile.about
        });
    },

    /**
     * getLink.
     * 
     * renders the sign up and sign in page.
     * @param {*} req 
     * @param {*} res 
     */
    getLink: function(req, res) {
        res.render('link', {});
    },

    postLink: function(req, res) {
        res.render('link', {});
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
    postSignIn: function(req, res) {
        const sess = req.session;
        var email = req.body.email;
        var password =  req.body.password;

        Okami.findOne({email: email, password: password}, (err, result)=> {
            sess.okami = result;
            console.log(req.session.okami.email);
            res.send(result);
        });
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
