const express = require("express");
const pool = require("../db/db");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, async function (req, res, next) {
  try {
    const allRatings = await pool.query("SELECT * FROM ratings");
    res.json(allRatings.rows);
  } catch (e) {
    console.error(e.message);
  }
});

router.post("/", checkAuth, async (req, res, next) => {
  const rating = await pool.query(`SELECT * FROM ratings where rating=$1`, [
    req.body.rating,
  ]);

  if (rating.rows.length >= 1) {
    return res.status(409).json({
      message: "Rating already Exsits",
    });
  } else {
    try {
      const insert = pool.query(`INSERT INTO ratings(rating) VALUES($1)`, [
        req.body.rating,
      ]);
      res.status(201).json({
        message: "Created Rating Succesfully",
      });
    } catch (e) {
      console.error(e.message);
      res.status(500).json({
        error: err,
      });
    }
  }
});

router.patch("/:ratingId", checkAuth, (req, res) => {
  const id = req.params.ratingId;

  try {
    const insert = pool.query(`UPDATE ratings SET rating = $2 WHERE id=$1;`, [
      id,
      req.body.rating,
    ]);
    res.status(200).json({
      message: "Rating Updated",
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.delete("/:ratingId", checkAuth, (req, res) => {
  const id = req.params.ratingId;

  try {
    const insert = pool.query(`Delete From ratings where id=$1`, [id]);
    res.status(200).json({
      message: "Rating deleted",
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
