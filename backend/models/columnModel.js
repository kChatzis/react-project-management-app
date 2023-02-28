const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  order: {
    type: Number,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Column", columnSchema);
