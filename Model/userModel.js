const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,},
    username: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['buyer', 'seller'], required: true },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
});
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports =  new mongoose.model('User', userSchema);