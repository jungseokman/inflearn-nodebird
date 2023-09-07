const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const passport = require("passport");

router.post("/", async (req, res, next) => {
  const { email, nickname, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    await User.create({
      email,
      nickname,
      password: hashedPassword,
    });

    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }

  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.log(loginErr);
          return next(loginErr);
        }
        return res.status(200).json(user);
      });
    })(req, res, next);
  });

  // console.log(email, nickname, password);
  // const insertQuery = `
  // INSERT INTO Users (email, nickname, password, createdAt, updatedAt)
  // VALUES ("${email}", "${nickname}", "${hashedPassword}", NOW(), NOW());
  // `;
  // try {
  //   db.query(insertQuery, (error, result) => {
  //     if (error) {
  //       console.error(error);
  //       throw "회원가입을 할 수 없습니다.";
  //     }
  //     return res.status(200).send({ result: true });
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(400).send("데이터 베이스 오류 발생");
  // }
});

module.exports = router;
