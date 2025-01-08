const mongoose = require("mongoose");

exports.dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Db Connection Successfully");
    })
    .catch((err) => {
      console.log("Db Connection Issue");
      console.log(err);
      process.exit(1);
    });
};
