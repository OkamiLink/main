const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

// get functions
app.get(`/`, controller.getIndex);
app.get(`/profile`, controller.getProfile);
app.get(`/signuppage`, controller.getSignUp);
app.get(`/howl`, controller.getHowl);

// post functions
app.post(`/signup`, controller.postSignUp);

module.exports = app;
