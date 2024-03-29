const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./models");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passportConfig = require("./passport");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser("nodebirdSecret"));
app.use(session());
app.use(passport.initialize());
app.use(
  passport.session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch(console.error);

passportConfig();

// app.get -> 가져오다
// app.post -> 생성하다.
// app.put -> 전체 수정
// app.delete -> 제거
// app.patch -> 부분 수정
// app.options ->찔러보기
// app.head -> 헤더만 가져오기 (바디를 제외하고)

app.get("/", (req, res) => {
  res.send("HELLO EXPRESS");
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`${PORT} :: NODE BIRD SERVER`);
});
