import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        maxLength: [20, "Name must be at most 20 characters long"]
    },
    username: {
        type: String,
        required: [true, "Please enter your address or phone number"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters long"],
        trim: true
    },
    avatar: {
        type: String,
        default: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
    },
    registration_type: {
        type: String,
        default: "standard"
    },
    role: {
        type: String,
        default: "member"
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)