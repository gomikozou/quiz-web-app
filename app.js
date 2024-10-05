const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./questionDB.db", (err) => {
    if (err) {
        console.error(err.message);
        console.log("テータベースに接続できませんでした");
    } else {
        console.log("データベースに接続しました");
    }
});



app.get("/", (req, res) => {
    res.render("top.ejs");
});

app.get("/hard", (req, res) => {
    db.all("SELECT * FROM hardQ", (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("question.ejs", { questions: row });
        }
    });
});

app.get("/normal", (req, res) => {
    db.all("SELECT * FROM normalQ", (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("question.ejs", { questions: row });
        }
    });
});

app.get("/easy", (req, res) => {
    db.all("SELECT * FROM easyQ", (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("question.ejs", { questions: row });
        }
    });
});

app.listen(3000);