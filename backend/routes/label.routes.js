const express = require("express");
const { db } = require("../store");
const { openai } = require("../openai");


const router = express.Router();

router.post("/auto-label", async (req, res) => {
  const unlabeled = Object.values(db.datasets)
    .filter(d => d.status === "pending");

  for (let item of unlabeled) {
    const prompt = `Label this data: ${JSON.stringify(item.input)}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    item.label = completion.choices[0].message.content;
    item.status = "labeled";
    db.stats.labeled++;
  }

  res.json({ message: "Auto labeling completed" });
});

router.post("/review/:id", (req, res) => {
  const { label } = req.body;
  const item = db.datasets[req.params.id];

  item.label = label;
  item.status = "reviewed";
  db.stats.reviewed++;

  res.json({ message: "Label updated" });
});

module.exports = router;

