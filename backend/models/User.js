const mongoose = require('mongoose');
const joi = require('joi');


// Create a schema
const userSchema = new mongoose.Schema({
   username: {
         type: String,
         required: true,
         unique: true,
         trim : true,
         minlength: 2 ,
         maxlength: 100,         
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true,
        minlength: 5,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        trim : true,
        minlength: 8,
    },
    profilephoto: {
        type: Object,
        default: {
            url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            public_id: 'null'
        }
    },
    bio: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
});

// Create a model
const User = mongoose.model('User', userSchema);

// Validate the user
function validateRegisterUser(obj) {
    const schema = joi.object({
        username: joi.string().trim().min(2).max(100).required(),
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}
// Export the model
module.exports = {
    User,
    validateRegisterUser
};