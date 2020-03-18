const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const reservationRouter = require("./api/reservation");
const reviewsRouter = require("./api/reviews");
const router = express.Router();
const path = require("path");

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

// const bodyParser = require('body-parser')
// router.use(bodyParser.json())

// Serve the built client html
const buildPath = path.join(__dirname, "./../frontend");
app.use(express.static(buildPath));


router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewsRouter);
router.use("/reservation", reservationRouter);


app.use("/api", router);

// Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./../frontend/index.html"), function(err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(port, () => console.log(`Server start on port ${port}!`));