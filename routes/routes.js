const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

// get functions
app.get(`/`, controller.getIndex);
app.get(`/profile`, controller.getProfile);
app.get(`/link`, controller.getLink);
app.get(`/howl`, controller.getHowl);
app.get(`/getCheckEmail`, controller.getCheckEmail);

// post functions
app.post(`/signup`, controller.postSignUp);
app.post(`/signin`, controller.postSignIn);
app.post(`/link`, controller.postLink);

module.exports = app;
