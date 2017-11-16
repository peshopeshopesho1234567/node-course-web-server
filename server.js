const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile("server.log", log + '\n', (err) => {
		if (err) {
			console.log("Unable to log...");
		}
	});

	next();
});

app.use((req, res, next) => {
	res.render("maintenance.hbs", {
		pageTitle: "Under maintenance"
	})
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase();
});

app.get("/", (request, response) => {
	// response.send("<h1>Hello, Express!</h1>");
	response.render("home.hbs", {
		welcomeMessage: "Hello, World",
		pageTitle: "Home page"
	});
});

app.get("/about", (request, response) => {
	response.render("about.hbs", {
		pageTitle: "About page"
	});
});

app.get("/bad", (request, response) => {
	response.send({
		error: "Bad request"
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});