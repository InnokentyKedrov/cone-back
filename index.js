const express = require("express");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 3010;
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const height = req.body.height;
  const radius = req.body.radius;
  const segments = req.body.segments;
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
