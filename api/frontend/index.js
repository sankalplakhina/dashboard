import express from 'express';
import passport from 'passport';

// controllers
import order from './controllers/order';
import orders from './controllers/orders';
import review from './controllers/review';
import overview from './controllers/overview';

const router = express.Router();
// authenticate all routes
// router.use(passport.authenticate('jwt', { session: false }));

router.get('/order', order);
router.get('/orders', orders);
router.get('/review', review);
router.get('/overview', overview);

module.exports = router;