// Creating a simple express server

// 1) Bringing in express (import)
const express = require("express");

// Bringing in the path module, a node.js module for dealing with file paths
const path = require("path");

// Handlebars from express-handlebars
const exphbs = require("express-handlebars");

const members = require("./Members");

// Importing logger
const logger = require("./middleware/logger");

// 2) Initialized a variable called app with express
const app = express();

// Commented out the logger as I do not need it for now
// Initializing my middleware function:
// app.use(logger);

// Handlebars Middleware
// 1.setting up the view/template engine to handlebars, and then passing in exphbs and here I am setting the default layout to a file name of main
app.engine(
  ".handlebars",
  exphbs.engine({ extname: ".handlebars", defaultLayout: "main" })
);
// 2.Setting the view engine
app.set("view engine", "handlebars");

// Body Parser Middleware
// this allows to handle raw json
app.use(express.json());
// this handles form submissions
app.use(express.urlencoded({ extended: false }));

// Creating a route to render handlebars - Homepage route
// we are in the main index and I want to render on the main page (index page)
// returning res.render("index") because I want to render the index view
// Homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);

// Setting a static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

// Setting to a port number, but adding process.env.PORT, when I deploy, the server will have the port number in an environment variable
// this way we check first for a port variable, if there is no port variable in the environment then it will directly run on port 5000
const PORT = process.env.PORT || 5000;

// 3) This app has a bunch of properties and methods, one of them is "listen"
// I want to listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
