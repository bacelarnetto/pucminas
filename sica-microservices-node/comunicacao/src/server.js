import 'dotenv/config';
import express from 'express';

import Queue from './app/lib/Queue';
import eurekaHelper from './app/lib/eureka-helper'

const PORT = process.env.SERVER_PORT || 3334;

const app = express();

Queue.process(); 

app.listen(PORT, () => {
  console.log('Server running on localhost '+ 3334);
});

eurekaHelper.registerWithEureka('comunicacao', PORT);