import 'dotenv/config';
import express from 'express';

import Queue from './app/lib/Queue';
import eurekaHelper from './app/lib/eureka-helper'
const { createHystrixStream, getPrometheusStream } = require('simplified-hystrixjs');

const PORT = process.env.SERVER_PORT || 3334;

const app = express();

Queue.process(); 


createHystrixStream(app,'/actuator/hystrix.stream'); // default /manage/hystrix.stream
getPrometheusStream()

app.listen(PORT, () => {
  console.log('Server running on localhost '+ 3334);
});

eurekaHelper.registerWithEureka('comunicacao', PORT);