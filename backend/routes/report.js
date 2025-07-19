const express = require("express");
const Report = require("../models/Report");
const Blog = require("../models/Blog");
const router = express.Router();

router.post("/", async (req, res) => {
  const report = await Report.create(req.body);
  res.json(report);
});

router.get("/", async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

router.delete("/blog/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  await Report.deleteMany({ blogId: req.params.id });
  res.sendStatus(204);
});

module.exports = router;
