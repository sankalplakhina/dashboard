import express from 'express';
import passport from 'passport';

// controllers
import order from './controllers/order';
import orders from './controllers/orders';
import review from './controllers/review';
import overview from './controllers/overview';
import action from './controllers/action';

const router = express.Router();
// authenticate all routes
// router.use(passport.authenticate('jwt', { session: false }));

router.get('/order', order);
router.get('/orders', orders);
router.get('/review', review);
router.get('/overview', overview);
router.post('/action', action);

module.exports = router;