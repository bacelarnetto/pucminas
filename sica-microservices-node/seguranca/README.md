# Segurança
Modulo responsavel por jogar as mensagens na fila para processo em background<br/>

## Instalação
`yarn` <br/>
ou <br/>
`npm install` <br/>

## Criar e configurar arquivo ".env"
Criar um arquivo de configuração renomeando o arquivo ".env.example" para ".env" <br/> 
e modificar os parametros de acordo com as variaveis do seu ambiente de desenvolvimento.

## Inicializar 
`yarn start`<br/>
ou <br/>
`npm start` <br/>

## Libs usadas

- bull <br/>
     URL: https://github.com/OptimalBits/bull<br/>
     
- bull-board<br/>
     Dashboard de monitoramento de filas<br/>

- eureka-js-client<br/>
    bibliotaca de integração com eueka da netflix<br/>

- simplified-hystrixjs<br/>
     URL: https://www.npmjs.com/package/simplified-hystrixjs

- express<br/>

- swagger-ui-express<br/>

- amqplib<br/>
     bibliotaca para integração do RabbitMQ no NodeJS

## Bull Board Dashboard
### Visualizar as filas
URL: http://localhost:3333/admin/queues

## Swagger
### Visualizar as endpoints
http://localhost:3333/api-docs/


