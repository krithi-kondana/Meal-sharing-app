const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");


router.get("/", (req, res) => {
    const maxPrice = req.query.maxPrice;
    const availableReservations = req.query.availableReservations;
    const title = req.query.title;
    const createdAfter = req.query.createdAfter;
    const limit = req.query.limit;

    if (Object.entries(req.query).length === 0) {
        pool.query("select * from meal", function(error, results, fields) {
            if (error) {
                console.log(error);
            }
            res.send(results);
            // http://localhost:5000/api/meals
        })
    } else if (maxPrice) {
        pool.query(`select * from meal where price < ${parseFloat(maxPrice)}`, function(error, results, fields) {
            if (error) {
                console.log(error);
            }
            res.send(results);
            // http://localhost:5000/api/meals?maxPrice=50
        })
    } else if (availableReservations && JSON.parse(availableReservations) === true) {
        pool.query(`select meal.*, reservation.number_of_guests
         from meal inner join reservation on reservation.meal_id = meal.id where meal.max_reservations > reservation.number_of_guests;`, function(error, results, fields) {
            if (error) {
                console.log(error);
            }
            res.send(results);
            // http://localhost:5000/api/meals?availableReservations=true
        })
    } else if (title) {
        pool.query(`select * 
        from meal
        where title like '%${title}%'`, function(error, results, fields) {
            if (error) {
                console.log(error);;
            }
            res.send(results);
            // http://localhost:5000/api/meals?title=rød%20grød
        })
    } else if (createdAfter) {
        pool.query(`select *
        from meal
        where created_date > '${createdAfter}'`, function(error, results, fields) {
            if (error) {
                console.log(error);
            }
            res.send(results);
            // http://localhost:5000/api/meals?createdAfter=2020-02-23
        })
    } else if (limit) {
        pool.query(`select *
        from meal
        limit ${limit}`, function(error, results, fields) {
            if (error) {
                console.log(error);
            }
            res.send(results);
            //  http://localhost:5000/api/meals?limit=2
        })
    }
})


// Returns all meals
router.get("/", (req, res) => {
    pool.query("select * from meal", function(error, results, fields) {
        if (error) {
            console.log(err);;
        }
        res.send(results)
    });
});
// http://localhost:5000/api/meals



// Returns meal by id
router.get("/:id", (req, res) => {
        const id = req.params.id;
        if (!id) {
            return res.send(`Please enter id`)
        }
        pool.query("select * from meal where id=?", id, (err, results) => {
            if (err) {
                console.log(err)
            }
            return res.send(results)
        })
    })
    // http://localhost:5000/api/meals/5



// Updates the meal by id
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    if (!id || !title) {
        return res.send("All params are required");
    }

    pool.query("update meal SET title=? where id=?", [title, id], (err, results) => {
        if (err) {
            console.error(err);
        }
        return res.send({ updated: results.affectedRows > 0 });
    });
});


// Deletes the meal by id	
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.send("All params are required");
    }
    pool.query("delete from meal where id = ?", id, (err, results) => {
        if (err) {
            console.log(err)
        }
        res.send({ deleted: results.affectedRows > 0 })
    })
})


// Adds a new meal
router.post("/", (req, res) => {
    // const title = req.body.title;
    // const description = req.body.description;
    // const location = req.body.location;
    // const when = req.body.when;
    // const max_reservations = req.body.max_reservations;
    // const price = req.body.price;
    // const created_date = req.body.created_date;

    const { title, description, location, when, max_reservations, price, created_date } = req.body;
    // let data = req.body;

    if (!title || !description || !location || !when || !max_reservations || !price || !created_date) {
        return res.send("All params are required");
    }

    pool.query("INSERT INTO meal SET ?", { title, description, location, when, max_reservations, price, created_date }, (err, results) => {


        if (err) {
            console.error(err);
        }
        return res.send({ createdId: results.insertId });
    });
    // console.log(query);

});


module.exports = router;