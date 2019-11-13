const express = require("express");
const hbs = require("hbs");

// Instantiate express app
const app = express();

// Set view engine as handlebars
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static("public"));

// Set routing logic
app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/about", (req, res, next) => {
  res.render("about", {
    name: "José Carneiro",
    age: 26,
    occupation: "Lead Instructor",
    employer: "Ironhack",
    hasAMoustache: false,
    pets: [
      {
        name: "Panda",
        type: "dog"
      },
      {
        name: "Whiskers",
        type: "cat"
      }
    ],
    location: {
      country: "Portugal",
      city: "Lisbon",
      neighborhood: "Quinta dos Barros"
    }
  });
});

// Listen to port 3000
app.listen(3000);
