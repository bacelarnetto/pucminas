import bodyParser from 'body-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './../swagger.json';
import BullBoard from 'bull-board';
import Queue from './../app/lib/Queue';


module.exports = app => {
    BullBoard.setQueues(Queue.queues.map(queue => queue.bull));
    app.use(bodyParser.json())
    app.use(cors({
        origin: '*'
    }))
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.use('/admin/queues', BullBoard.UI)
  
}