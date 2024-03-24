const asyncHandler = require('express-async-handler');
const { User, validateRegisterUser } = require('../models/User');
const bycrypt = require('bcryptjs');
 


/**
 * @desc    Register a new user
 * @route   /api/auth/register
 * @method POST
 * @access  Public
 */

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: 'User already registered' });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
})
