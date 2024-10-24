const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {};

authController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }, '-createdAt -updatedAt -__v');
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = await user.generateToken();
                return res.status(200).json({ status: 'success', user, token });
            }
        }
        throw new Error('Invalid email or password');
    } catch (err) {
        return res.status(400).json({ status: 'fail', error: err.message });
    }
};

module.exports = authController;
