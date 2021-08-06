const express = require("express");
const pool = require("../db/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (e) {
    console.error(e.message);
  }
});

router.post("/signup", async (req, res, next) => {
  const email = await pool.query(`SELECT * FROM users where email=$1`, [
    req.body.email,
  ]);

  if (email.rows.length >= 1) {
    return res.status(409).json({
      message: "Mail Exsits",
    });
  } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        try {
          const insert = pool.query(
            `INSERT INTO users(username, email, password) VALUES($1, $2,$3)`,
            [req.body.username, req.body.email, hash]
          );
          res.status(201).json({
            message: "Created User Succesfully",
          });
        } catch (e) {
          console.error(e.message);
          res.status(500).json({
            error: err,
          });
        }
      }
    });
  }
});

router.post("/login", async (req, res, next) => {
  const user = await pool.query(`SELECT * FROM users where email=$1`, [
    req.body.email,
  ]);
  if (user.rows.length < 1) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
  bcrypt.compare(req.body.password, user.rows[0].password, (err, result) => {
    if (err) {
      return res.status(401).json({
        message: "Auth Failed",
      });
    }
    if (result) {
      const token = jwt.sign(
        {
          email: user.rows[0].email,
          id: user.rows[0].id,
        },
        "secret",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        message: "Auth Successful",
        token: token,
      });
    }
    res.status(401).json({
      message: "Auth Failed",
    });
  });
});

router.delete("/:userId", checkAuth, (req, res) => {
  const id = req.params.userId;

  try {
    const insert = pool.query(`Delete From users where id=$1`, [id]);
    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
