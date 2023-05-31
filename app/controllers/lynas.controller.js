var fs = require('fs');
var path = require('path');
const db = require("../models");
const Book = db.Books;


exports.createbook = (req, res) => {
  console.log(req.body)
  if (!req.body.title) {
    res.send({ message: "Content can not be empty!" });
    return;
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    price1: req.body.price1,
    price2: req.body.price2,
    Hardback: req.body.Hardback,
    Paperback: req.body.Paperback,
    aboutbook: req.body.aboutbook,
    bookimg: req.file.filename,
    Category: req.body.Category,
  });
  book
    .save(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the lynas."
      });
    });
}
exports.findAllbooks = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Book.find({})
    .then(data => {
      const newData = data.map((item, index) => {
        item.bookimg = `http://localhost:6688/images/${item.bookimg}`
        return item;
      })
      res.status(200).send(newData);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookname."
      });
    });
};
// Find all published lynas
exports.findAllcategory = (req, res) => {
  const searchCategory = req.body.Category;

  var condition = searchCategory ? { "Category": { $regex: new RegExp(searchCategory), $options: "i" } } : {};
  Book.find(condition)
    .then(data => {
      const category = data.filter((item, index) => {
         item.bookimg =`http://localhost:6688/images/${item.bookimg}`
         item.Category =item.Category
         return item;
      })
      res.status(200).send(category)
     
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lynas."
      });
    });
  
}


// Find a single lynas with an id
exports.findOne = (req, res) => {
  const id = req.body.id;
  Book.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found lynas with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving lynas with id=" + id });
    });
};



// // Update a lynas by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }
//   console.log(req.body,req)
//   const id = req.body.id;
//   Book.findByIdAndUpdate(id, req, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update lynas with id=${id}. Maybe lynas was not found!`
//         });
//       } else res.send({ message: "lynas was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating lynas with id=" + id
//       });
//     });
// };

// Delete a lynas with the specified id in the request
exports.delete = (req, res) => {
  const delete1 = req.body.delete1;
  Book.findByIdAndRemove(delete1, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete lynas with id=${id}. Maybe lynas was not found!`
        });
      } else {
        res.send({
          message: "book was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete lynas with delete=" + id
      });
    });
};

// Delete all lynas from the database.
exports.deleteAll = (req, res) => {
  Book.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} lynas were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all lynas."
      });
    });
};


