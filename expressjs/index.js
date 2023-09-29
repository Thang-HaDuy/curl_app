var express = require('express');
const sqlite3 = require('sqlite3').verbose();

var app = express();
const db = new sqlite3.Database('./database.db');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://127.0.0.1:5500");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

///seed-data tạo databasase và seed data
app.get('/seed-data', function (req, res) {
  db.serialize(() => {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='ten_bang'", (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      if (row) {
        db.run('CREATE TABLE blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, content TEXT)');
      } else {
        console.log("Bảng đã tồn tại");
      }
    });
    for(var i = 1; i < 6; i++) {
      db.run('INSERT INTO blogs (title, author, content) VALUES (?, ?, ?)',[ `What is your name${i}?`, `author${i}`, "JavaScript ignores multiple spaces. You can add white space to your script to make it more readable."], (err, row) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
      });
    }
  });
  console.log('/seed-data');
  res.send('OK!');
});


app.get('/', function (req, res) {
  var html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    </head>
    <body>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
              <a class="navbar-brand" href="#">Home</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/blogs">Blog</a>
                  </li>
                </ul>
                <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>
          <div class="container text-center mt-5">
            <div>
              <h4>Author</h4>
              <h1>Thang HaDuy</h1>
              <h6>project Restful api curl expressjs on beginner</h6>
              <p>
                <a class="btn btn-success" href="/blogs">Blog</a>
                <a class="btn btn-danger" href="/seed-data">Seed Data</a>
              </p>
            </div>
          </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </body>
    </html>
  `
  console.log('GET: /');
  res.send(html);
});

// danh sách blog
app.get('/blogs', function (req, res) {
  db.serialize(() => {
    db.all('SELECT * FROM blogs', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log('GET: /blogs');
      res.send(rows);
    });
  });
});


//xem chi tiết
app.get('/blogs/:id', function (req, res) {
  var id = req.params.id;
  db.get('SELECT * FROM blogs WHERE id = ?', id, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`GET: /blogs/${id}`);
    res.json(row);
  });
});

//thêm 1 bài blog
app.post('/blogs', function (req, res) {
  var title = req.body.title;
  var content = req.body.content;
  var author = req.body.author;
  db.run('INSERT INTO blogs (title, author, content) VALUES (?, ?, ?)', [title, author, content], function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Post: /blogs/");
    res.send('Bài blog đã được thêm thành công');
  });
});

//sửa 1 bài blog
app.put('/blogs/:id', function (req, res) {
  var id = req.params.id;
  var title = req.body.title;
  var content = req.body.content;
  var author = req.body.author;

  db.run('UPDATE blogs SET title = ?, author = ?, content = ? WHERE id = ?', [title, author, content, id], function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`PUT: /blogs/${id}`);
    res.send('Bài blog đã được cập nhật thành công');
  });
});


//xóa 1 bài blog
app.delete('/blogs/:id', function (req, res) {
  var id = req.params.id;
  db.run('DELETE FROM blogs WHERE id = ?', id, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`DELETE: /blogs/${id}`);
    res.send('Bài blog đã được xóa thành công');
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
