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
  pool.query(
    "SELECT * FROM game_records WHERE player_name = $1",
    [username],
    (error, results) => {
      if (error) {
        res.status(500).send("Error occurred");
      } else {
        if (results.rows.length === 0) {
          const insertUser = `INSERT INTO game_records (player_name, score) VALUES ($1, $2);`;
          pool.query(insertUser, [username, score], (error, response) => {
            if (error) {
              res.status(500).send("Error occurred");
            } else {
              res.status(200).send("Data added successfully");
            }
          });
        } else {
          const existingScore = results.rows[0].score;
          if (score > existingScore) {
            const updateQuery = `UPDATE game_records SET score = $1 WHERE player_name = $2;`;
            pool.query(updateQuery, [score, username], (error, response) => {
              if (error) {
                res.status(500).send("Error occurred");
              } else {
                res.status(200).send("Data updated successfully");
              }
            });
          } else {
            res.status(200).send("No update needed");
          }
        }
      }
    }
  );
});

app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "DELETE FROM game_records WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error deleting record: ", error);
        res.status(500).send("Error");
      } else {
        res.status(200).send(`Record with id ${id} deleted successfully.`);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});
