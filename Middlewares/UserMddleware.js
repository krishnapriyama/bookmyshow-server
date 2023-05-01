const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (token) {
    console.log("Token true");
    jwt.verify(
      token,
      "SuperSecretKey",
      async (err, decodedToken) => {
        if (err) {
          console.log("Token err");
          res.json({ status: false });
          next();
        } else {
          console.log("Token decode true");
          const user = await User.findById(decodedToken.id);
          if (user) res.json({ status: true, user: user.email });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    console.log("Token false");
    res.json({ status: false });
    next();
  }
};
