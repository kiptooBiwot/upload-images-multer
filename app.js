const express = require("express");
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')
const createError = require('http-errors')

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')

app.use(express.static('./public'))

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MULTER everything
const multerConfig = {
  // Specify storage
  storage: multer.diskStorage({
    // Specify images folder
    destination: function (req, file, next) {
      next(null, './public/images')
    },
    filename: function (req, file, next) {
      next(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  fileFilter: function (req, file, next) {
    if (!file) {
      next(createError("No file chosen"));
    }
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // check extension
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // check Mimetype
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return next(null, true);
    } else {
      // console.log(err)
      next(createError('Error: Upload image files ONLY!'))
    }
  }
}

app.get("/", (req, res) => res.render('index'));

app.post('/upload', multer(multerConfig).single('myImage'), (req, res, next) => {
  try {
      console.log(req.file)
        res.send('Works')
  } catch (error) {
    next(error)
  }
})

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
