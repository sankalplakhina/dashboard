import express from 'express';
import passport from 'passport';

// controllers
import orders from './controllers/orders';
import review from './controllers/review';
import overview from './controllers/overview';

const router = express.Router();
// authenticate all routes
// router.use(passport.authenticate('jwt', { session: false }));

router.get('/orders', orders);
router.get('/review', review);
router.get('/overview', overview);

module.exports = router;