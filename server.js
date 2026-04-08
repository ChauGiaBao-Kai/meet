const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://giabaochau39_db_user:MGxSnCOpFws3s2hI@meet.knkslld.mongodb.net/?appName=meet",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.log(err));

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const User = require("../models/User");

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB Atlas
mongoose.connect(
  "mongodb+srv://webmeetUser:12345678@cluster0.mongodb.net/webmeet?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.log(err));

// API đăng ký
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra user đã tồn tại chưa
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "User đã tồn tại" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ username, password: hashed });
    await newUser.save();

    res.json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

app.listen(3000, () => console.log("Server chạy tại http://localhost:3000"));