const express = require("express");
const db = require("./db/connect");
const Stations = require("./models/stations");
const Owners = require("./models/owners");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const statsData = await Stats.returnStats(); // call the returnStats function to get the data
  res.render("index", { apiKey: process.env.MAPS_API_KEY, stats: statsData });
});



app.get("/api/stations/all", async (req, res) => {
  const data = await Stations.all();
  res.json(data);
});

app.get("/api/owners", async (req, res) => {
  const data = await Owners.owners();
  res.json(data);
});

const Stats = require("./models/stats");

app.get(`/keys/commodity`, async (req, res) => {
  res.json({commodityKey: process.env.COMMODITIES_API_KEY})
})

const port = process.env.PORT || 8080;

async function init() {
  await db.connect();
  app.listen(port, console.log(`Server running on port ${port}`));
}

init();
