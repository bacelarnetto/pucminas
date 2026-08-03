import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './../swagger.json';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import Queue from './../app/lib/Queue';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: Queue.queues.map(queue => new BullAdapter(queue.bull)),
    serverAdapter,
});


module.exports = app => {
    app.use(express.json())
    app.use(cors({
        origin: '*'
    }))
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.use('/admin/queues', serverAdapter.getRouter())
}
