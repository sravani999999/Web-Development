import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("./index.ejs",{
    data:1
  });
  
});

app.post("/submit", (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  res.render('index', { fName, lName });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
