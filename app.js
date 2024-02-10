//hint: ESversion: 6
const mongoose = require("mongoose");
const express = require("express");
const body = require("body-parser");
const ejs = require("ejs");

const app = express();
const port = 4000;
//Make connection from DB
mongoose.connect("mongodb://localhost:27017/apiDB");
//make Schema and model for Article in db
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Article = mongoose.model("Article", articleSchema);

//Use ejs for Templeting
app.set("view engine", "ejs");

//use body parser
app.use(
  body.urlencoded({
    extended: true,
  })
);
//use static folder
app.use(express.static("public"));
//code playground
//start with get request route
//chained route implemented
///General Route//////////////////
app
  .route("/articles")
  .get((req, res) => {
    Article.find()
      .then((result) => {
        if (result) {
          console.log(result);
          res.send(result);
        } else {
          console.log("Error");
          res.send("Error");
        }
      })
      .catch((err) => console.log(err));
  })
  // app.post
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save().then(() => {
      res.send("Successfully added");
      console.log("successful Saved");
    });
  })

  //delete route
  .delete((req, res) => {
    Article.deleteMany()
      .then(() => {
        res.send("deleted all data");
        console.log("All data whiped aout from db");
      })
      .catch((err) => {
        console.log(err);
        res.send("Error");
      });
  });

///////////////////////get specific route/////////////////////////////////////////////////////////////////
app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle })
      .then((result) => {
        res.send(result);
        console.log(result);
      })
      .catch((err) => console.log(err));
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }).then((result) => {
      if (result) {
        console.log("successful Deleted");
        res.send("Deleted Successful");
      } else {
        console.log("sNot Found");
        res.send("Not Found");
      }
    });
  })
  .put((req, res) => {
    Article.update(
      { title: req.params.articleTitle },
      {
        title: req.params.title,
        content: req.params.content,
      }
    )
      .then(() => {
        console.log("successful");
        res.send("sucessfuld updated");
      })
      .catch((err) => {
        console.log("there is err ${err}");
        res.send("something went wrong ${err}");
      });
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: articleTitle },
      {
        $set: {
          content: req.params.content,
        },
      }
    );
  });


  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
