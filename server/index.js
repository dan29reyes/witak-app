const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const multer = require("multer");

app.use(bodyparser.json());
app.use(bodyparser.json({ limit: '100mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../files');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });

const upload = multer({ storage: storage });
app.post('/upload', upload.single('pdf'), (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error uploading file', err);
      return res.status(500).send('Error uploading file');
    }
    res.status(200).send(req.file);
  });
});

const userRouter = require('./routes/user-routes');
const tableroRouter = require('./routes/tablero-routes');
const formulariosRouter = require('./routes/formularios-routes');

app.use('/usuarios', userRouter);
app.use('/tablero', tableroRouter);
app.use('/formularios', formulariosRouter);

app.listen(8000, () => {
    console.log('Server started!');
});