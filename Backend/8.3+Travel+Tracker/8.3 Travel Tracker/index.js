import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "sushi",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
let countries = [];
app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visted_countries");
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });

});

var i = 0;

app.post("/add", async (req, res) => {
  const c = req.body.country;
  const result = await db.query("SELECT country_code FROM countries where country_name IN ($1)",[c]);
  const x = result.rows[0].country_code;
  console.log(x);
  const result1 = await db.query("INSERT INTO visted_countries (country_code) VALUES ($1)",[x]);
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
