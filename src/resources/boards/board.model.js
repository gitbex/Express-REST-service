const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number
      },
      {
        title: String,
        order: Number
      }
    ]
  },
  { versionKey: false }
);

const toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', BoardSchema);

module.exports = { Board, toResponse };
