const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");

router.get("/", (req, res) => {
    pool.query("select * from review", function(error, results, fields) {
        if (error) {
            console.log(err);
        }
        res.send(results)
    });
});
// http://localhost:5000/api/reviews

router.get("/:id", (req, res) => {
        const id = req.params.id;
        if (!id) {
            return res.send(`Please enter id`)
        }
        pool.query("select * from review where id=?", id, (err, results) => {
            if (err) {
                console.log(err)
            }
            return res.send(results)
        })
    })
    // http://localhost:5000/api/reviews/5

router.post("/", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const meal_id = req.body.meal_id;
    const stars = req.body.stars;

    const data = {
        title: title,
        description: description,
        meal_id: meal_id,
        stars: stars
    };
    if (!title || !description || !meal_id || !stars) {
        return res.send("All params are required");
    }
    pool.query("INSERT INTO review SET ?", data, (err, results) => {
        if (err) {
            console.error(err);
        }
        return res.send({...data, id: results.insertId });
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    if (!id || !title) {
        return res.send("All params are required");
    }
    pool.query("update review SET title=? where id=?", [title, id], (err, results) => {
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
    pool.query("delete from review where id = ?", id, (err, results) => {
        if (err) {
            console.log(err)
        }
        res.send({ deleted: results.affectedRows > 0 })
    })
})


module.exports = router;