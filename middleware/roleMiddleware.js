module.exports = function roleMiddleware(requiredRole) {
    return (req, res, next) => {
      if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).render("error", {
          message: "Access denied"
        });
      }
      next();
    };
  };
  