import { body } from 'express-validator';

const createAdminValidator = [
    body('email', 'Invalid email format!')
        .isEmail(),
    body('password', 
        'Password must be at least 8 characters long! \n Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!')
        .isLength({ min: 8 }) 
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
];

export default createAdminValidator