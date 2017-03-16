import express from 'express';
import passport from 'passport';

// controllers
import orders from './controllers/orders';

const router = express.Router();
// authenticate all routes
// router.use(passport.authenticate('jwt', { session: false }));

router.get('/explore/orders', orders);

module.exports = router;