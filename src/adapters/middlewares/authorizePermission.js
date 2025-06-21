const authorizePermission = (requiredPermission) => {
  return (req, res, next) => {
    const permissions = req.user?.permissions || [];

    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "No tienes permiso para esta acción" });
    }

    next();
  };
};

module.exports = authorizePermission;