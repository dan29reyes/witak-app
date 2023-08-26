const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(bodyparser.json());
app.use(bodyparser.json({ limit: '100mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());

const userRouter = require('./routes/user-routes');
const tableroRouter = require('./routes/tablero-routes');
const formulariosRouter = require('./routes/formularios-routes');

app.use('/usuarios', userRouter);
app.use('/tablero', tableroRouter);
app.use('/formularios', formulariosRouter);

app.listen(8000, () => {
    console.log('Server started!');
});