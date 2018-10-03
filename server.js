const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const bodyParser = require("body-parser");
const passport = require("passport");
//bodyparser middlewere
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
//DB connection
const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected to databse"))
  .catch(err => console.log(err));
//creating port for server
const port = process.env.PORT || 5000;
//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//listning to the route
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(port, () => console.log(`listning to the port ${port}`));
