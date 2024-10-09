const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.get("/question", (req, res) => {
    const table = req.query.table;
    db.all(`SELECT * FROM ${table}`, (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("question.ejs", { questions: row });
        }
    });
});

app.get("/questionIndex", (req, res) => {
    const table = req.query.table;
    db.all(`SELECT * FROM ${table}`, (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("questionIndex.ejs", { questions: row, table: table });
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
    console.log(table);
    console.log(qText);
    console.log(qAnswer);

    db.run(`INSERT INTO ${table} (qText, qAnswer) VALUES (?, ?)`, [qText, qAnswer], (err) => {
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

    console.log(`テーブル名: ${table}, ID: ${id}`);

    db.run(`DELETE FROM ${table} WHERE id = ?`, [id], (err) => {
        if (err) {
            console.error("削除エラー:", err.message);
            return res.status(500).send("問題の削除に失敗しました");
        } else {
            res.redirect(`/questionIndex?table=${table}`);
        }
    });
});



app.listen(3000);
