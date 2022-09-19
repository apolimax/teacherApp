import { allowedOriginsList } from "./allowedOriginsList.js";

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOriginsList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};
