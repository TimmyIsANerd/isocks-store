const jwt = require("jsonwebtoken");

module.exports = async function (req, res, proceed) {
  if (req.header("authorization")) {
    const token = req.header("authorization").split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Unathorized",
        message: "No Token Provided",
      });
    }

    return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "Invalid/Expired Token",
        });
      }

      if (!payload.user) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "No user ID present in token",
        });
      }

      const adminRecord = await Admin.findOne({
        id: payload.user,
      });

      if (!adminRecord) {
        return res.status(404).json({
          error: "Resource Not Found",
          message: "User does not exist in Database",
        });
      }

      req.user = adminRecord.id;
      return proceed();
    });
  }

  return res.status(401).json({
    status: "Unauthorized",
    message: "Unauthorized Access from client side",
  });
};
