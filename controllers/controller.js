const db = require('../models/db.js');
const {Echo} = require('../models/HowlModel.js');
const {Howl} = require('../models/HowlModel.js');
const {Profile} = require('../models/OkamiModel.js');
const {Okami} = require('../models/OkamiModel.js');
const {render} = require('../routes/routes.js');

const controller = {

    getCheckEmail: function(req, res) {
        email = req.query.email;

        Okami.findOne({email: email}, (err, result)=>{
            res.send(result);
        });
    },

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
    getProfile: async (req, res) => {
        let sess = req.session;
        let howls = [];

        await Howl.find({okamid:sess.okami.okamid}).sort({howlid: -1}).then(result => {
            howls = result;
        }, error => {
            console.log(error);
        });

        res.render('profile', {
            name: sess.okami.name,
            bio: sess.okami.profile.bio,
            about: sess.okami.profile.about,
            howls: howls
        });
    },

    getHome: function(req, res) {
        let sess = req.session;

        Howl.find({}).sort({howlid: -1}).exec((err, result) => {
            res.render('profile', {
                name: sess.okami.name,
                bio: sess.okami.profile.bio,
                about: sess.okami.profile.about,
                howls: result
            });
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

    /**
     * getHowl.
     * 
     * adds a howl to the database.
     * @param {*} req 
     * @param {*} res 
     */
    getHowl: function(req, res) {
        let sess = req.session;
        var howlText = req.query.howl;
        var date = new Date();
        var time = date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});

        Howl.countDocuments({}, function(err, count) {
            var howl = new Howl({
                howlid: count + 1,
                okamid: sess.okami.okamid,
                name: sess.okami.name,
                text: howlText,
                time: time
            });
    
            howl.save();
            res.send(howl);
        })
    },

    getEcho: function(req, res) {
        let sess = req.session;
        var echoText = req.query.echo;
        var howlid = req.query.howlid;
        var date = new Date();
        var time = date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});

        var echo = new Echo({
            okamid: sess.okami.okamid,
            name: sess.okami.name,
            text: echoText,
            time: time
        });

        Howl.findOneAndUpdate({howlid: howlid}, 
            {$push: {comments: echo}}, function (error, success) {
                if (error)
                    console.log(error);
            });
    },

    getUpdateAbout: function(req, res) {
        let sess = req.session;
        about = req.query.about;
        sess.okami.profile.about = about;
        sess.save();
        profile = new Profile({
            about: about,
            bio: sess.okami.profile.bio,
            followers: sess.okami.profile.followers,
            games: sess.okami.profile.games
        })

        Okami.findOneAndUpdate({okamid: sess.okami.okamid}, {profile: profile}, function(err, succ){
            if (err)
                console.log(err);
        });
    },

    getUpdateGames: function(req, res) {

    },

    getLogOut: function(req,res) {
        req.session.destroy();
        res.render('index');
    },

    /**
     * postLink.
     * 
     * renders the sign up and sign in page.
     * @param {*} req 
     * @param {*} res 
     */
    postLink: function(req, res) {
        res.render('link', {});
    },

    /**
     * postSignIn.
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
            if(err) {
                console.log(err);
            }
            else {
                sess.okami = result;
                res.send(result);
            }
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
