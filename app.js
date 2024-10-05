app.js


const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
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

ejs.renderFile('template.ejs', { /* データオブジェクト */ }, (err, str) => {
    if (err) {
        console.error(err);
        return;
    }
    // 結果をHTMLファイルに書き込む
    fs.writeFileSync('output.html', str);
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