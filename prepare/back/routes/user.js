const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  const { email, nickname, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  console.log(email, nickname, password);
  const insertQuery = `
  INSERT INTO Users (email, nickname, password, createdAt, updatedAt) 
  VALUES ("${email}", "${nickname}", "${hashedPassword}", NOW(), NOW());  
  `;
  try {
    db.query(insertQuery, (error, result) => {
      if (error) {
        console.error(error);
        throw "회원가입을 할 수 없습니다.";
      }
      return res.status(200).send({ result: true });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터 베이스 오류 발생");
  }
});

module.exports = router;
