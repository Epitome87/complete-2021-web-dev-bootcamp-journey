const express = require('express');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const homeStartingContent = 'Welcome to my Blog!';
const aboutContent = 'About Me!';
const contactContent = 'Contact Me!';

const posts = [];

app.get('/', (req, res) => {
  res.render('home', { homeStartingContent, posts });
});

app.get('/posts/:postName', (req, res) => {
  console.log(req.params.postName);

  posts.forEach((post) => {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.postName)) {
      res.render('post', { post });
    }
  });
});

app.post('/compose', (req, res) => {
  const { title, message } = req.body;

  const post = {
    title,
    message,
  };

  posts.push(post);

  res.redirect('/');
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.get('/about', (req, res) => {
  res.render('about', { aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact', { contactContent });
});

app.listen(3000, () => {
  console.log('App listening on Port 3000');
});
