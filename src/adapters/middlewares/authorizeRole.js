const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    //const userRoles = req.user?.roles || [];
    const userRoles = req.userRoles || [];

    const hasAccess = allowedRoles.some(role => userRoles.includes(role));
    if (!hasAccess) {
      return res.status(403).json({ message: "Acceso denegado por rol" });
    }

    next();
  };
};

module.exports = authorizeRole;
