const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");

router.get("/", (req, res) => {
    pool.query("select * from reservation", function(error, results, fields) {
        if (error) {
            console.log(err);
        }
        res.send(results)
    });
});
// http://localhost:5000/api/reservations

router.get("/:id", (req, res) => {
        const id = req.params.id;
        if (!id) {
            return res.send(`Please enter id`)
        }
        pool.query("select * from reservation where id=?", id, (err, results) => {
            if (err) {
                console.log(err)
            }
            return res.send(results)
        })
    })
    // http://localhost:5000/api/reservations/5

router.post("/", (req, res) => {
    const number_of_guests = req.body.number_of_guests;
    const meal_id = req.body.meal_id;
    const created_date = req.body.created_date;

    const data = {
        number_of_guests: number_of_guests,
        meal_id: meal_id,
        created_date: created_date
    };

    if (!number_of_guests || !meal_id || !created_date) {
        return res.send("All params are required");
    }

    pool.query("INSERT INTO reservation SET ?", data, (err, results) => {
        if (err) {
            console.error(err);
        }
        return res.send({...data, id: results.insertId });
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const number_of_guests = req.body.number_of_guests;

    if (!id || !number_of_guests) {
        return res.send("All params are required");
    }

    pool.query("update reservation SET number_of_guests=? where id=?", [number_of_guests, id], (err, results) => {
        if (err) {
            console.error(err);
        }
        return res.send({ updated: results.affectedRows > 0 });
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.send("All params are required");
    }
    pool.query("delete from reservation where id = ?", id, (err, results) => {
        if (err) {
            console.log(err)
        }
        res.send({ deleted: results.affectedRows > 0 })
    })
})


module.exports = router;