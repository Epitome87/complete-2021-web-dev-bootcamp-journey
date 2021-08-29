const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const databaseName = 'wikiDB';
mongoose.connect(`mongodb://localhost:27017/${databaseName}`);

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
});

const Article = mongoose.model('Article', articleSchema);

const newArticle = new Article({
  title: 'Test',
  content: 'This is me testing a new article',
});

// newArticle.save();

app
  .route('/articles')
  .get((req, res) => {
    Article.find({}, (err, foundArticles) => {
      if (!err) res.send(foundArticles);
      else res.send(err);
    });
  })
  .post((req, res) => {
    // Create new article, insert it into DB
    const { title, content } = req.body;
    const article = new Article({ title, content });
    console.log('Req body', title, content);

    article.save((err) => {
      if (!err) res.send('Succesfully added a new Article');
      else res.send(err);
    });
  })
  .delete((req, res) => {
    Article.deleteMany({}, (err) => {
      if (!err) res.send('Successfully deleted all Articles');
      else res.send(err);
    });
  });

app
  .route('/articles/:articleTitle')
  .get((req, res) => {
    const { articleTitle: title } = req.params;
    Article.findOne({ title }, (err, foundArticle) => {
      if (!err) res.send(foundArticle);
      else res.send('No articles matching that title were found');
    });
  })
  .put((req, res) => {
    Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err, foundArticle) => {
        if (!err) res.send('Successfully updated article');
        else res.send('No articles matching that title were found');
      }
    );
  })
  .patch((req, res) => {
    Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      { $set: req.body },
      (err, foundArticle) => {
        if (!err) res.send('Succesfully updated article');
        else res.send('No articles matching that title were found');
        res.send(foundArticle);
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (err) => {
      if (!err) res.send('Succesfully deleted the article');
      else res.send('No articles matching that title were found: ' + err);
    });
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
