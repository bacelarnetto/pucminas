import 'dotenv/config';

import Queue from './app/lib/Queue';
import eurekaHelper from './app/lib/eureka-helper'

const PORT = process.env.SERVER_PORT;

Queue.process(); 

eurekaHelper.registerWithEureka('comunicacao', PORT);