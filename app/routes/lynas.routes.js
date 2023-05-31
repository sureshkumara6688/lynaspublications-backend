module.exports = app => {
  const lynas = require("../controllers/lynas.controller.js");
const userinfo =require("../controllers/nodemailer/mailer.js")
  const multer = require('multer');
  

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {        
        cb(null , Date.now()+'_'+file.originalname);
    }
  });
  const upload = multer({ storage: storage }) 

  var router = require("express").Router();
  
  // Create a new lynas
  router.post("/addproduct",upload.single('file'), lynas.createbook);

  // Retrieve all lynas
  router.get("/products", lynas.findAllbooks);

  // Retrieve all published lynas
  router.post("/category", lynas.findAllcategory);


  // Retrive user information send to mail
  router.post("/contact", userinfo.finduserdetail);


  // Retrieve a single lynas with id
  router.get("/:id", lynas.findOne);

  // Update a lynas with id
  // router.put("/edit", lynas.update);

  // Delete a lynas with id
  router.delete("/delete1", lynas.delete);

  app.use("/api/lynas", router);
  
  app.use("/api/userinfo", router);
};
