const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.post("/adduser", (req, res) => {
  const username = req.body["player_name"];
  const score = req.body["score"];
  console.log(username);
  const insertUser = `INSERT INTO game_records (player_name, score) VALUES ('${username}', '${score}');`;
  pool
    .query(insertUser)
    .then((response) => {
      console.log("SAVED");
      console.log(response);
      res.status(200).send("Data added successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});
app.get("/adduser", (req, res) => {
  pool.query(
    "SELECT * FROM game_records ORDER BY score DESC",
    (error, results) => {
      if (error) {
        console.error("Bad request: ", error);
        res.status(500).send("Error");
      } else {
        res.json(results.rows);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});
