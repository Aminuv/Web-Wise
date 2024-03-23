const mongoose = require('mongoose');

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
            url: 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/',
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
    }
    isAccountVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


// Create a model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;