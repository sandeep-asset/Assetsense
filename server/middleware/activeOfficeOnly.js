export const activeOfficeOnly = (req, res, next) => {
  req.activeFilter = { isActive: true };
  next();
};
