const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userController = {};

userController.createUser = async (req, res) => {
    try {
        let { name, email, password, level } = req.body;
        //
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('User already exist');
        }
        const salt = await bcrypt.genSaltSync(10);
        password = await bcrypt.hash(password.salt);
        const newUser = new User({ name, email, password, level: level ? level : 'customer' });
        await newUser.save();
        return res.status(200).json({ status: 'success' });
        user.save;
    } catch (err) {
        res.status(400).json({ status: 'fail', error: error.message });
    }
};
module.exports = userController;
