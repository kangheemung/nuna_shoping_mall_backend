const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userController = {};

userController.createUser = async (req, res) => {
    try {
        let { name, email, password, level } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('User already exists');
        }
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);

        const newUser = new User({ name, email, password: hash, level: level || 'customer' }); // Updated line to use default value for level

        await newUser.save();

        return res.status(200).json({ status: 'success' });
    } catch (err) {
        return res.status(400).json({ status: 'fail', error: err.message });
    }
};
userController.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email }, '-createdAt -updatedAt -__v');
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                const token = await user.generateToken();
                return res.status(200).json({ status: 'success', user, token });
            }
        }
        throw new Error('Email or password does not match.');
    } catch (err) {
        return res.status(400).json({ status: 'fail', error: err.message });
    }
};

module.exports = userController;
