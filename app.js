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

<<<<<<< HEAD
app.get("/hardQIndex", (req, res) => {
    const table = req.query.table;
    db.all("SELECT * FROM hardQ", (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("questionIndex.ejs", { questions: row, table: table });
        }
    });
});

app.get("/normalQIndex", (req, res) => {
    const table = req.query.table;
    db.all("SELECT * FROM normalQ", (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("questionIndex.ejs", { questions: row, table: table });
        }
    });
});

app.get("/easyQIndex", (req, res) => {
    const table = req.query.table;
    db.all("SELECT * FROM easyQ", (err, row) => {
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

app.get("/displayBack", (req, res) => {
    const table = req.query.table;
    console.log(table);
    switch (table) {
        case "hardQ":
            res.redirect(`/${table}Index?table=${table}`);
            break;
        case "normalQ":
            res.redirect(`/${table}Index?table=${table}`);
            break;
        case "easyQ":
            res.redirect(`/${table}Index?table=${table}`);
            break;
        default:
            res.redirect("/");
    }
});

app.post("/questionAdd", (req, res) => {
    const qText = req.body.qText;
    const qAnswer = req.body.qAnswer;
    const difficulty = req.body.difficulty;

    let table;
    switch (difficulty) {
        case "hard":
            table = "hardQ";
            break;
        case "normal":
            table = "normalQ";
            break;
        case "easy":
            table = "easyQ";
            break;
        default:
            return res.status(400).send("Invalid difficulty level");
    }

    db.run(`INSERT INTO ${table} (qText, qAnswer) VALUES (?, ?)`, [qText, qAnswer], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send("データベースへの追加に失敗しました");
        } else {
            res.redirect(`/${table}Index?table=${table}`);
        }
    });
});

app.post("/questionDelete", (req, res) => {
    const questionId = req.body.id;
    const tableName = req.body.table;

    console.log(`テーブル名: ${tableName}, ID: ${questionId}`);

    db.run(`DELETE FROM ${tableName} WHERE id = ?`, [questionId], (err) => {
        if (err) {
            console.error("削除エラー:", err.message);
            return res.status(500).send("問題の削除に失敗しました");
        } else {
            res.redirect(`/${tableName}Index?table=${tableName}`);
        }
    });
});



app.listen(3000);
=======
app.listen(3000);
>>>>>>> dc2abe84889ae8a0f7a314bda92865f92f3ae765
