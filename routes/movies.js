const express = require("express");
const pool = require("../db/db");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, async function (req, res, next) {
  try {
    const allMovies = await pool.query("SELECT * FROM movies");
    res.json(allMovies.rows);
  } catch (e) {
    console.error(e.message);
  }
});

router.post("/", checkAuth, async (req, res, next) => {
  const movie = await pool.query(`SELECT * FROM movies where movie_name=$1`, [
    req.body.movie_name,
  ]);

  if (movie.rows.length >= 1) {
    return res.status(409).json({
      message: "Movie already Exsits",
    });
  } else {
    try {
      const rating = await pool.query(`SELECT * FROM ratings where rating=$1`, [
        req.body.rating,
      ]);

      if (rating.rows.length < 1) {
        return res.status(409).json({
          message: "Rating doesn't Exsit",
        });
      } else {

      const insert = pool.query(
        `INSERT INTO movies(movie_name, rating) VALUES($1, $2)`,
        [req.body.movie_name, rating.rows[0].id]
      );
      res.status(201).json({
        message: "Created Movie Succesfully",
      });
    }
    } catch (e) {
      console.error(e.message);
      res.status(500).json({
        error: err,
      });
    }
}
});

router.delete("/:movieId", checkAuth, (req, res) => {
  const id = req.params.movieId;

  try {
    const insert = pool.query(`Delete From movies where id=$1`, [id]);
    res.status(200).json({
      message: "Movie deleted",
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.patch("/:movieId", checkAuth, async (req, res) => {
  const id = req.params.movieId;

  try {
    const rating = await pool.query(`SELECT * FROM ratings where rating=$1`, [
      req.body.rating,
    ]);

    if (rating.rows.length < 1) {
        return res.status(409).json({
          message: "Rating doesn't Exsit",
        });
      } else {

    const insert = pool.query(
      `UPDATE movies SET movie_name = $2, rating = $3 WHERE id=$1;`,
      [id, req.body.movie_name, rating.rows[0].id]
    );
    res.status(200).json({
      message: "Movie Updated",
    });
}
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
