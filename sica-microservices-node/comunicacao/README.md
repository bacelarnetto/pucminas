# Comunicação
Modulo responsavel por pegar as mensagens na fila para processo em background de envios de emails<br/>

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

- express<br/>

- nodemailer<br/>
    bibliotaca de envio de email<br/>

