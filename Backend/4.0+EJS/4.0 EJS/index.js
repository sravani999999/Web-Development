import express from "express";

const app = express();
const port = 3000;

function getIt(){
    const d = new Date();
let day = d.getDay();
if(day == 0 || day == 6){
    return ["Weekend","have fun"];
}
else{
    return ["Weekday","work hard"];
}
};
app.get("/", (req, res) => {
    res.render("index.ejs",{
        name : getIt() });
});
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  