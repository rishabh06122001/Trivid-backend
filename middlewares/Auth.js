const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  //to check if user is authenticated or not

  try {
    //Other ways to fetch token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer", "");

    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    //verify the token
    try {
      //verify function takes two parameters
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload, "j");
      req.user = payload;
    } catch (err) {
      return res.status(401).json({
        success: "false",
        message: "token is Invalid",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something  went wrong,while verifying the token",
    });
    console.log(err);
  }
};

exports.isSuperAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for SuperAdmin",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: "False",
      messsage: "User role is not Matching",
    });
    console.log(err);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: "false",
        message: "This is a  Protected Route for Admin",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: "false",
      message: "User role is not matching",
    });
  }
};
