const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");

router.get("/", (req, res) => {
    pool.query("select * from reservations", function(error, results, fields) {
        if (error) {
            console.log(err);
        }
        res.send(results)
    });
});


router.post("/", (req, res) => {
    const { meal_id, name, email, phonenumber } = req.body;

    if (!meal_id || !name || !email || !phonenumber) {
        return res.send("All params are required");
    }

    pool.query("INSERT INTO reservations SET ?", { meal_id, name, email, phonenumber }, (err, results) => {
        if (err) {
            console.error(err);
        }
        // return res.send({...data, id: results.insertId });
        return res.send({ createdId: results.insertId });

    });
});


module.exports = router;