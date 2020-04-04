var amqp = require('amqplib/callback_api');
import rabbitmqConfig from '../../config/rabbitmq';
import SegurancaTask from './../tasks/SegurancaTask'

module.exports = () => amqp.connect(rabbitmqConfig.host, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        let queue = 'seguranca'
        channel.assertQueue(queue, {
            durable: true
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue); 
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());   
            SegurancaTask.taskAlert(msg.content.toString())   
        }, {
            noAck: true
        });
    });
});