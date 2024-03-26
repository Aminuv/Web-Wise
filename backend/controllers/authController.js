const asyncHandler = require('express-async-handler');
const { User, validateRegisterUser, validateLoginUser } = require('../models/User');
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

    // @TODO - sned email (verification account)

    res.status(201).json({ message: 'User registered successfully' });
})

/**
 * @desc    Login a User
 * @route   /api/auth/login
 * @method POST
 * @access  Public
 */

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bycrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' }); 
    }

// @TODO - sned email (verification if account is not verified)

    const token = user.generateAuthToken();

    res.status(200).json({
        __id : user._id,
        isAdmin : user.isAdmin,
        profilePhoto : user.profilePhoto,
        token,
     });
})