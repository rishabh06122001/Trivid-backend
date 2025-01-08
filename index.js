const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 8000;
//middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies and credentials
  })
);

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

require("./Config/database").dbConnect();

const superAdmin = require("./Routes/SuperAdmin");
const admin = require("./Routes/Admin");
const user = require("./Routes/user");
app.use("/api/v1", user);
app.use("/api/v1", superAdmin);
app.use("/api/v1", admin);
app.listen(PORT, () => {
  console.log(`App started at ${PORT}`);
});
