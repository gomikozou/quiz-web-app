const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nine3690",
    database: "questiondb"
});

db.connect((err) => {
    if (err) {
        console.error(err.message);
        console.log("データベースに接続できませんでした");
    } else {
        console.log("データベースに接続しました");
    }
});

app.get("/", (req, res) => {
    res.render("top.ejs");
});

app.get("/question", (req, res) => {
    const table = req.query.table;
    db.query(`SELECT * FROM ??`, [table], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("question.ejs", { questions: rows });
        }
    });
});

app.get("/questionIndex", (req, res) => {
    const table = req.query.table;
    db.query(`SELECT * FROM ??`, [table], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("questionIndex.ejs", { questions: rows, table: table });
        }
    });
});

app.get("/questionCreatePage", (req, res) => {
    const table = req.query.table;
    res.render("questionCreate.ejs", { table: table });
});

app.post("/questionAdd", (req, res) => {
    const table = req.body.table;
    const qText = req.body.qText;
    const qAnswer = req.body.qAnswer;

    db.query(`INSERT INTO ?? (qText, qAnswer) VALUES (?, ?)`, [table, qText, qAnswer], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send("データベースへの追加に失敗しました");
        } else {
            res.redirect(`/questionIndex?table=${table}`);
        }
    });
});

app.post("/questionDelete", (req, res) => {
    const id = req.body.id;
    const table = req.body.table;

    db.query(`DELETE FROM ?? WHERE id = ?`, [table, id], (err) => {
        if (err) {
            console.error("削除エラー:", err.message);
            return res.status(500).send("問題の削除に失敗しました");
        } else {
            res.redirect(`/questionIndex?table=${table}`);
        }
    });
});

app.listen(3000);
