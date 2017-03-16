import express from 'express';
import passport from 'passport';

// controllers
import explore from './controllers/explore';
import statsPanels from './controllers/stats-panels';
import review from './controllers/review';
import analyze from './controllers/analyze';

const router = express.Router();
// authenticate all routes
router.use(passport.authenticate('jwt', { session: false }));

router.get('/explore', explore);
router.get('/explore/stats-panels', statsPanels);
router.get('/review', review);
router.get('/analyze', analyze);

module.exports = router;