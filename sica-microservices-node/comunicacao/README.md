# Comunicação
Módulo responsável por pegar as mensagens na fila para processo em background de envios de emails<br/>

## Instalação
`yarn` <br/>
ou <br/>
`npm install` <br/>

## Criar e configurar arquivo ".env"
Criar um arquivo de configuração renomeando o arquivo ".env.example" para ".env" <br/> 
e modificar os parametros de acordo com as variaveis do seu ambiente de desenvolvimento.<br/><br/>

Exemplo:<br/>
##### Arquivo ".env" do módulo de comunicação

`SERVER_PORT=3332` <br/>

`REDIS_HOST=localhost` <br/>
`REDIS_PORT=6379` <br/>

`MAIL_HOST=smtp.mailtrap.io` <br/>
`MAIL_PORT=xxxx` <br/>
`MAIL_USER=xxxxxxxxxx` <br/>
`MAIL_PASS=xxxxxxx` <br/>

`HOSTNAME=localhost` <br/>
`IP_ADDR=XXX.XX.X.X` <br/>
`EUREKA_PORT=8081` <br/>
`EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=localhost` <br/>

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

- express<br/>

- nodemailer<br/>
    bibliotaca de envio de email<br/>

