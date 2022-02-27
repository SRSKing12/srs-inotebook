const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Thi$i$@$@mp|eKey'

const fetchUser = (req, res, next) => {
    // Get user from JWT & add ID to object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "Please authenticate using valid token!"})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token!"})
    }
}

module.exports = fetchUser