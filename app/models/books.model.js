
const { type } = require("os");
const { stringify } = require("querystring");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      price1: {
        type: Number,
        required: true
      },
      aboutbook: {
        type: String,
        required: false
      },
      bookimg: {
        type: String,
        required: true
      },
      price2: {
        type: Number,
        required: true
      },
      Hardback: {
        type: String,
        required: true
      },
      Paperback: {
        type: String,
        required: true
      },
      Category: {
        type: String,
        required: true
      }
    });
  const Booklist = mongoose.model("Books", schema);
  return Booklist;
};
