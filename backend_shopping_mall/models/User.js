const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        //권한 관리
        level: { type: String, default: 'customer' }, //2typs: customer, admin
    },
    { timestamps: true }
);
userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;
    delete obj.updateAt;
    return obj;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
