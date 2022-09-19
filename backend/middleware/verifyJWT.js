import jwt from "jsonwebtoken";

const veryJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const accessTokenRequest = authHeader.split(" ")[1]; // Get the token from the string 'Bearer token'

  jwt.verify(
    accessTokenRequest,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403); // 403 Forbidden
      req.isCoordinator = decoded.UserInfo.isCoordinator;
      next();
    }
  );
};

export default veryJWT;
