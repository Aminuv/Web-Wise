const router = require('express').Router();
const { registerUserCtrl } = require('../controllers/authController');

// /api/auth/register
router.post('/register', registerUserCtrl);

// export the router
module.exports = router;
