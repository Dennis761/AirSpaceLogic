import AdminModel from '../Models/AdminModel.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const createUser = new AdminModel({
            email: req.body.email,
            passwordHash: hash,
            banners: [],
            productCategories: []
        });

        const user = await createUser.save();

        const token = generateTokenAndSetCookie(user._id, res);

        const { passwordHash, ...userData } = user._doc;

        res.status(200).json({
            ...userData, 
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to register' });
    }
};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Администратор не найден' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверный пароль' });
        }

        const token = generateTokenAndSetCookie(admin._id, res);

        res.status(200).json({ token, message: 'Вход выполнен успешно' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Вы успешно вышли из системы" });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};
