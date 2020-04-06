# Arquitetura de Software - PUC Minas
### Prova de Conceito do projeto de conclusão do curso de Pós-Graduação em Arquiterura de Sofware Distribuido da PUC Minas 

## Escopo
Sistema de Controle Ambiental - SCA

1 - Execução da infraestrutura de bancos de dados via Docker <br/>
cd C:\workspace\sica-microservices <br/>
C:\workspace\sica-microservices>docker-compose -f stack.yml up <br/>

## Principais técnologias utilizadas
### Backend
[Java](https://java.com/pt_BR/)<br/>
[Spring Boot](https://spring.io/projects/spring-boot)<br/>
[Node.js](https://nodejs.org/en/)<br/>
[Camunda](https://camunda.com/)<br/>
[Grafana](https://grafana.com/)/[Prometheus](https://prometheus.io/)<br/>

### DevOps
[Maven](https://maven.apache.org/)<br/>
[Docker](https://www.docker.com/)<br/>
[Yarn](https://yarnpkg.com/)<br/>

### Infraestrutura
[PostgreSQL](https://www.postgresql.org/)<br/>
[pgAdmin](https://www.pgadmin.org/)<br/>
[RabbitMQ](https://www.rabbitmq.com/)<br/>
[Redis](https://redis.io/)<br/>

### Frontend
[React](https://reactjs.org/)<br/>
[Redux](https://redux.js.org/)<br/>
[Redux-saga](https://redux-saga.js.org/)<br/>
[Material-ui](https://material-ui.com/)<br/>


# Modulos 

## Segurança:
Api feita com Node.js<br>
Configurção da api de [segurança](/seguranca/README.md)

## Comunicação:
Api feita com Node.js<br>
Configurção da api de [comunicação](/comunicacao/README.md)


## RabbitMQ
URL: http://192.168.99.105:9080/

## PgAdmin
URL: http://192.168.99.105:5050/



