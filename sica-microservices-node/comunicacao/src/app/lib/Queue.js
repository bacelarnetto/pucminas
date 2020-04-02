import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs';
  
const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig ),
  name: job.key,
  handle: job.handle,
  options: job.options,
}))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name);    
    return queue.bull.add(data, queue.options);
  },
  
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull
      .on('error', (error) =>{
        console.error(`>> Error in bull queue happend:`, queue.key, job.data);
        console.log(`>> Error: ${error}`);
      })
      .on('failed', (job, error) => {
        console.log('>> Job failed', queue.key, job.data);
        console.log(`>> Error: ${error}`);
      });
    })
  }
};

//https://github.com/OptimalBits/bull/issues/890