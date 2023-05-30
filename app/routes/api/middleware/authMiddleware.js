const jwt = require('jsonwebtoken');
const roleService = require('../../../services/role');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.role = await roleService.findById(req.user.role_id);
    next();
  }
  catch(err) {
    console.log(err);
    return res.sendStatus(401);
  }
}

module.exports = authenticateToken;