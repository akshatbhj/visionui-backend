const requireApiKey = (req, res, next) => {
  const apiKey = req.headers["x-userapi-key"];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "Access denied, no API provided in headers",
    });
  }
  req.userApiKey = apiKey;
  next();
};

export default requireApiKey;
