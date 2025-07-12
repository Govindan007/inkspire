const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  blogId: mongoose.Schema.Types.ObjectId,
  reporterId: mongoose.Schema.Types.ObjectId,
  reason: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", reportSchema);
