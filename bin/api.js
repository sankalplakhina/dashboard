// Root directory(NODE_PATH) for this server is defined in package.json
// "NODE_PATH": "./" from root folder
require('server.babel'); // babel registration (runtime transpilation for node)
const _ = require('lodash');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// authentication related dependencies
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const frontendApiRouter = require('api/frontend');
const dummyApiRouter = require('api/dummy');
const { apiPort } = require('config/env');

const users = [
  {
	username: "sankalp@gmail.com",
	firstName: "Sankalp",
	lastName: "Lakhina",
	password: "passwordtext",
  },
];

// jwt passport strategy
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'neo-fp-dashboard';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	const { username } = jwt_payload;
	const user = users[_.findIndex(users, {
		username
	})];
	if (user) {
		next(null, user);
	} else {
		next(null, false);
	}
});

passport.use(strategy);

const app = express();

app.use(morgan('dev', {}));
app.use(compression());
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

app.post('/api/login', function(req, res, next) {

	const { username, password } = req.body;
	const user = users[_.findIndex(users, {
		username
	})];

	if(!user){
		return res.status(401).json({
			data: {
				message:"No such user found!"
			}
		});
	}

	if(user.password === password) {
		// username is the only personalized value that goes into our token
		const payload = {username: user.username};
		const token = jwt.sign(payload, jwtOptions.secretOrKey);
		return res.json({
			data: {
				user,
				token,
			}
		});
	} else {
		return res.status(401).json({
			data: {
				message:"Wrong Password!"
			}
		});
	}
});

app.post('/api/register', function(req, res, next) {

	const { name, email, password, company } = req.body;
	const user = users[_.findIndex(users, {
		username: email
	})];

	if(user){
		return res.status(401).json({
			data: {
				message:"User with this email already exists!"
			}
		});
	}

	const nameArr = name.split(' ');
	const newUser = {
		username: email,
		firstName: nameArr[0],
		lastName: nameArr[1]? nameArr.slice(1).join(' '): null,
		password,
		company
	};
	users.push(newUser);
	// username is the only personalized value that goes into our token
	const payload = {username: newUser.username};
	const token = jwt.sign(payload, jwtOptions.secretOrKey);
	return res.json({
		data: {
			user: newUser,
			token,
		}
	});
});

app.get("/api/logout", passport.authenticate('jwt', { session: false }), function(req, res){
	res.json({
		data: {
			message: "Logged out successfully!"
		}
	});
})

app.use('/fapi', frontendApiRouter);
app.use('/api', dummyApiRouter);

app.listen(apiPort, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(`API is up on port ${apiPort}`);
	}
});
