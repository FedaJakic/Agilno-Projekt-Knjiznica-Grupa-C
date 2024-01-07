import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const SECRET_KEY = process.env.SECRET_KEY;

const tokenVerification = (authorizationHeaders) => {
  const tokenString = authorizationHeaders;
  const token = tokenString.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token", error);
    throw new Error("Invalid token", error);
  }
};

export const validateToken = (req) => {
  if (!req.headers.authorization) throw new Error("Missing authorization");
  const loggedUser = tokenVerification(req.headers.authorization);
  return loggedUser;
};

export const authorizeUser = (roles) => {
  return (req, res, next) => {
    const loggedUser = validateToken(req);
    if (!roles.some(role => loggedUser.role_id === role)) throw new Error('Forbidden access');
    req.authData = loggedUser;
    next();
  };
};
