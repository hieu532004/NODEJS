const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
// cấu hình cho phép nhận dữ liệu từ body của request
app.use(express.json());
// cấu hình cho phép nhận dữ liệu từ query parameter
app.use(express.urlencoded({ extended: true }));
// localhost:3000/

// cấu hình thư mục public chuẩn bị cho việc chứa file static
app.use(express.static(path.join(__dirname, '../public')));
// cấu hình kiểu tập tin template
app.engine('.html', require('ejs').__express);
// Cấu hình thư mục template views
app.set('views', path.join(__dirname, 'views'));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

app.get('/', (req, res) => {
    // res.send('Hello World! dsdsdsdsss 1234');
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});
// localhost:3000/about
app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
    ]);
});

//Chỉ chấp nhận a-z, A-Z, 0-9 và _
app.post('/users/:username([a-z A-Z 0-9 _])', (req, res) => {
    res.send(`User profile of ${req.params.username}`);
});

app.post('/product/:id(\\d{1,3})', (req, res) => {
    // route parameter
    const { id } = req.params;
    // query parameter
    const { page } = req.query;
    // body parameter
    const body = req.body;
    console.log(body);

    res
        .status(400)
        .send(`User profile of ${id} - PAGE: ${page}`);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});