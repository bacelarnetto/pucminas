# Segurança
Módulo responsável por jogar as mensagens na fila para processo em background<br/>

## Instalação
`npm install` <br/>

## Criar e configurar arquivo ".env"
Criar um arquivo de configuração copiando o arquivo ".env.example" para ".env" <br/>
e modificar os parâmetros de acordo com as variáveis do seu ambiente de desenvolvimento.
<br/><br/>

Exemplo:<br/>
##### Arquivo ".env" do módulo de segurança

`SERVER_PORT=3333` <br/>

`REDIS_HOST=localhost` <br/>
`REDIS_PORT=6379` <br/>

`RABBIT_HOST=amqp://localhost/` <br/>

`HOSTNAME=localhost` <br/>
`IP_ADDR=127.0.0.1` <br/>
`EUREKA_PORT=8081` <br/>
`EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=localhost` <br/>

`API_BARRAGEM=http://localhost:8082` <br/>

## Inicializar
`npm start` <br/>

## Libs usadas

- bull <br/>
     URL: https://github.com/OptimalBits/bull<br/>

- @bull-board/express<br/>
     Dashboard de monitoramento de filas<br/>

- eureka-js-client<br/>
     biblioteca de integração com eureka da netflix<br/>

- express <br/>

- swagger-ui-express <br/>

- amqplib <br/>
     biblioteca para integração do RabbitMQ no NodeJS <br/>

## Bull Board Dashboard
### Visualizar as filas
URL: http://localhost:3333/admin/queues

## Swagger
### Visualizar as endpoints
http://localhost:3333/api-docs/
