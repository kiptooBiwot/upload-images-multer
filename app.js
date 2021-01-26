const express = require("express");
const multer = require('multer')
const ejs = require('ejs')

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')

app.use(express.static('./public'))

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get("/", () => res.render('/index'));

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
