import jwt from 'jsonwebtoken'

const userSecretCode = process.env.JWT_SECRET || 'user-secret-code'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try {
            const decoded = jwt.verify(token, userSecretCode)
            const userId = decoded.userId
            next()
        } catch (error) {
            res.status(400).json({
                message: 'Your access failed'
            })
        }
    } else {
        res.status(400).json({
            message: `You don't have access`
        })
    }
}