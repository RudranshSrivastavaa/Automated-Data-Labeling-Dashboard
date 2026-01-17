const express = require("express");
const cors = require("cors");
require("dotenv").config();

const datasetRoutes = require("./routes/dataset.routes");
const labelRoutes = require("./routes/label.routes");

const app = express();

app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);

app.use(express.json());

app.use("/api/datasets", datasetRoutes);
app.use("/api/labels", labelRoutes);

app.listen(5010, () =>
  console.log(" Backend running on http://localhost:5010")
);
