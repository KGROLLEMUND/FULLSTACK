const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  console.log("req", req);
  // Vérifier si le token est présent dans le header "Authorization"
  const authHeader = req.header['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Placer les informations de l'utilisateur dans l'objet "user" de la requête
    next(); // Passer au middleware suivant
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
