const express = require("express");
const { parse } = require("csv-parse/sync");
const { v4: uuid } = require("uuid");
const { db } = require("../store");

const router = express.Router();

/**
 * Upload JSON or CSV
 */
router.post("/upload", (req, res) => {
  const { data, type } = req.body;

  let records = [];

  //  JSON upload
  if (type === "json") {
    records = data;
  }

  // CSV upload
  if (type === "csv") {
    records = parse(data, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
  }

  records.forEach(item => {
    const id = uuid();
    db.datasets[id] = {
      id,
      input: item,
      label: null,
      status: "pending"
    };
    db.stats.total++;
  });

  res.json({
    message: "Dataset uploaded",
    count: records.length
  });
});

router.get("/", (req, res) => {
  res.json(Object.values(db.datasets));
});

module.exports = router;
