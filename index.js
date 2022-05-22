const express = require('express')
const app = express();
const port = 3000;

const {getConnection} = require('./BD/db_conecction')

getConnection();

app.use(express.json());

app.use('/usuario', require('./routers/usuario'));
app.use('/estado-equipo', require('./routers/estadoequipo'));
app.use('/marca', require('./routers/marca'));
app.use('/tipo-equipo', require('./routers/tipoequipo'));
app.use('/inventario', require('./routers/inventario'));
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });