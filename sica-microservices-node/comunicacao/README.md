# Comunicação
Módulo responsável por pegar as mensagens na fila para processo em background de envios de emails<br/>

## Instalação
`npm install` <br/>

## Criar e configurar arquivo ".env"
Criar um arquivo de configuração copiando o arquivo ".env.example" para ".env" <br/>
e modificar os parâmetros de acordo com as variáveis do seu ambiente de desenvolvimento.<br/><br/>

Exemplo:<br/>
##### Arquivo ".env" do módulo de comunicação

`SERVER_PORT=3334` <br/>

`REDIS_HOST=localhost` <br/>
`REDIS_PORT=6379` <br/>

`MAIL_HOST=smtp.mailtrap.io` <br/>
`MAIL_PORT=2525` <br/>
`MAIL_USER=xxxxxxx` <br/>
`MAIL_PASS=xxxxxxx` <br/>

`ONE_SIGNAL_REST_KEY=xxxxxxx` <br/>
`ONE_SIGNAL_APP_ID=xxxxxxx` <br/>

`HOSTNAME=localhost` <br/>
`IP_ADDR=127.0.0.1` <br/>
`EUREKA_PORT=8081` <br/>
`EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=localhost` <br/>

## Inicializar
`npm start` <br/>

## Libs usadas

- bull <br/>
     URL: https://github.com/OptimalBits/bull<br/>

- eureka-js-client <br/>
     biblioteca de integração com eureka da netflix <br/>

- express <br/>

- nodemailer <br/>
     biblioteca de envio de email <br/>

- socket.io <br/>
     realtime para alertas no app mobile <br/>
