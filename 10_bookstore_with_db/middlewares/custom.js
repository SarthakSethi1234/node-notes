export const customMiddleware = (req, res, next) => {
  console.log("I am a custom middleware");
  next();
};
