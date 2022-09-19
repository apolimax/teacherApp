const verifyIsCoordinator = (req, res, next) => {
  const { isCoordinator } = req;

  if (!isCoordinator) return res.sendStatus(401);

  next();
};

export default verifyIsCoordinator;
