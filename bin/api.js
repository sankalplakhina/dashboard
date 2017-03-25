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
	name: "sankalp@gmail.com",
	password: "passwordtext",
	secret: "21359e4a71"
  },
];

// jwt passport strategy
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'neo-fp-dashboard';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	const { username } = jwt_payload;
	const user = users[_.findIndex(users, {
		name: username
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
		name: username
	})];

	if(!user){
		return res.status(401).json({
			success: false,
			message: 'Could not process the form.',
			errors: {
				username: 'email not valid.'
			}
		});
	}

	if(user.password === password) {
		// username is the only personalized value that goes into our token
		const payload = {username: user.name};
		const token = jwt.sign(payload, jwtOptions.secretOrKey);
		return res.json({
			success: true,
			message: "You have successfully logged in!",
			user,
			token,
		});
	} else {
		return res.status(401).json({
			success: false,
			message: 'Could not process the form.',
			errors: {
				password: 'Wrong Password!'
			}
		});
	}
});

app.post('/api/forgot', function(req, res, next) {

	const { username } = req.body;
	const user = users[_.findIndex(users, {
		name: username
	})];

	if(!user){
		return res.status(401).json({
			success: false,
			message: 'This Email is not registered',
		});
	}

	return res.json({
		success: true,
		message: "Password reset Link sent on mail",
	});
});

app.post('/api/reset-password', function(req, res, next) {

	const { resettoken, password } = req.body;

	if(resettoken === 'sometoken'){
		return res.status(401).json({
			success: false,
			message: 'An error has occured',
		});
	}

	return res.json({
		success: true,
		message: "Password has been reset. You will be redirected to login page.",
	});
});

app.post('/api/register', function(req, res, next) {

	const { username, password, website } = req.body;
	const user = users[_.findIndex(users, {
		name: username
	})];

	if(user){
		return res.status(401).json({
			success: false,
			message: 'Check the form for errors.',
			errors: {
				username: 'This email is already taken.'
			}
		});
	}

	const newUser = {
		name: username,
		password,
		website
	};
	users.push(newUser);
	// username is the only personalized value that goes into our token
	const payload = {username: newUser.name};
	const token = jwt.sign(payload, jwtOptions.secretOrKey);
	return res.json({
		success: true,
		message: "You have successfully signed up! Verification link sent on your email address."
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
