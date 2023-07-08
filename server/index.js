const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(bodyparser.json());
app.use(cors());

const userRouter = require('./routes/user-routes');
// const tableroRouter = require('./routes/tablero');
// const listaRouter = require('./routes/lista');
// const tarjetaRouter = require('./routes/tarjeta');
// const formulariosRouter = require('./routes/formularios');

app.use('/usuarios', userRouter);
// app.use('/tablero', tableroRouter);
// app.use('/lista', listaRouter);
// app.use('/tarjeta', tarjetaRouter);
// app.use('/formularios', formulariosRouter);

app.listen(8000, () => {
    console.log('Server started!');
});