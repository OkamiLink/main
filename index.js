const dotenv = require(`dotenv`);
const express = require(`express`);
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const redis = require('redis');
const session = require('express-session');
const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);

const app = express();

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

app.use(
    session({
        store: new RedisStore({ client: redisClient ,ttl: 86400}),  
        secret: ['veryimportantsecret','notsoimportantsecret','highlyprobablysecret'], 
        resave: false,
        saveUninitialized: true,
        name: "secretname", 
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: true,
            maxAge: 600000 // Time is in miliseconds
        }
    })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use(express.static(`public`));
app.use(`/`, routes);

db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + hostname + `:` + port);
});
