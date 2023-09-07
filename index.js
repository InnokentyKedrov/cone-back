const express = require("express");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 3010;
const cors = require("cors");
const app = express();

const whitelist = ["http://localhost:5173", "http://example2.com"];

app.options("*", cors());

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(bodyparser.json());

app.get("/", (res) => {
  res.send("From server");
});

app.post("/", (req, res) => {
  const { height, radius, segments } = req.body;

  const positions = [];

  for (let i = 0; i < segments; i++) {
    const position = [
      radius * Math.cos((2 * Math.PI * i) / segments),
      radius * Math.sin((2 * Math.PI * i) / segments),
      0,
      height,
      height,
      0,
      radius * Math.cos((2 * Math.PI * (i + 1)) / segments),
      radius * Math.sin((2 * Math.PI * (i + 1)) / segments),
      0,
    ];
    positions.push(position);
  }

  res.json({ positions: positions });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
