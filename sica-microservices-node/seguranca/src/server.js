import 'dotenv/config';//colocar antes de tudo
import express from 'express';
import eurekaHelper from './app/lib/eureka-helper'
import routes from './routes';
import middlewares from './config/middlewares.js'
import processSeguranca from './app/receivers/SegurancaReceive'

const PORT = process.env.SERVER_PORT || 3333;
const app = express();

middlewares(app);

processSeguranca()

app.use(routes);

app.listen(PORT, () => {
  console.log('Server running on localhost '+ PORT);
});

eurekaHelper.registerWithEureka('seguranca', PORT);