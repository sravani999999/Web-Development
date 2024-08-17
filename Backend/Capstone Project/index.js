import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let cards = [];

app.get("/", (req, res) => {
  res.render("index", { cards, editMode: false, currentCard: null, currentIndex: null });
});

app.post("/submit", (req, res) => {
  const newCard = {
    emailName: req.body.emailName,
    content: req.body.content,
  };
  cards.push(newCard);
  res.render("index", { cards, editMode: false, currentCard: null, currentIndex: null });
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  console.log(index);
  if (index !== undefined && index >= 0 && index < cards.length) {
    cards.splice(index, 1);
  }
  res.render("index", { cards, editMode: false, currentCard: null, currentIndex: null });
});

app.get("/edit", (req, res) => {
  const index = req.query.index;
  if (index !== undefined && index >= 0 && index < cards.length) {
    const currentCard = cards[index];
    res.render("index", { cards, editMode: true, currentCard, currentIndex: index });
  } else {
    res.render("index", { cards, editMode: false, currentCard: null, currentIndex: null });
  }
});

app.post("/edit", (req, res) => {
  const index = req.body.index;
  if (index !== undefined && index >= 0 && index < cards.length) {
    cards[index] = {
      emailName: req.body.emailName,
      content: req.body.content,
    };
  }
  res.render("index", { cards, editMode: false, currentCard: null, currentIndex: null });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
