import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user : "postgres",
  host : "localhost",
  database : "world",
  password : "sushi",
  port : 5432
});


db.connect();

let quiz = [];
db.query("SELECT country_code FROM visted_countries", (err, res) => {
  if(err){
    console.error("error executin query", err.stack);
  }else{
    res.rows.forEach((country) => {
      quiz.push(country.country_code);
    });
  }
  db.end();
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  console.log(quiz)
  res.render("index.ejs", {countries : quiz, total : 3});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
