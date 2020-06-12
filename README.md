# Arquitetura de Software - PUC Minas
### Prova de Conceito do projeto de conclusão do curso de Pós-Graduação em Arquitetura de Software Distribuído da PUC Minas 

## Escopo
Sistema de Controle Ambiental - SCA

## Principais técnologias utilizadas
### Backend
[Java](https://java.com/pt_BR/)<br/>
[Spring Boot](https://spring.io/projects/spring-boot)<br/>
[Spring Cloud](https://spring.io/projects/spring-cloud)<br/>
[Node.js](https://nodejs.org/en/)<br/>
[Camunda](https://camunda.com/)<br/>
[Socket.io](https://socket.io/)<br/>

### DevOps
[Maven](https://maven.apache.org/)<br/>
[Yarn](https://yarnpkg.com/)<br/>
[Docker](https://www.docker.com/)<br/>
[Jenkins](https://www.jenkins.io/)<br/>

### Infraestrutura
[PostgreSQL](https://www.postgresql.org/)<br/>
[pgAdmin](https://www.pgadmin.org/)<br/>
[RabbitMQ](https://www.rabbitmq.com/)<br/>
[Redis](https://redis.io/)<br/>
[NGINX](https://www.nginx.com/)<br/>
[Undertow](http://undertow.io/)<br/>

### Frontend
[React](https://reactjs.org/)<br/>
[Redux](https://redux.js.org/)<br/>
[Redux-saga](https://redux-saga.js.org/)<br/>
[Material-ui](https://material-ui.com/)<br/>
[Socket.io](https://socket.io/)<br/>

### Mobile
[React Native](https://react-native.org/)<br/>
[OneSignal](https://onesignal.com/)<br/>
[Socket.io](https://socket.io/)<br/>

## Instalação

### Pré-requisitos de instalação
DOCKER, JAVA, MAVEN, NODE.js.

#### Por Favor, Seguir a ordem de instalação. 

##### Passo 1 (PostgreSQL, RabbitMQ, Redis): 
1 - Abrir o diretório "pucminas/" via linha de comando.<br/>
2 - Executar o comando `docker-compose -up`<br/>
3 - Configurar filas. Acessar o link do RabbitMQ admin: URL: http://localhost:9080/<br/>

##### Passo 2 (APIs Java):
1 - Abrir o diretório "pucminas/sica-microservices-java/" via linha de comando.<br/>
2 - Executar o comando `mvn install -Dmaven.test.skip=true`<br/>
3 - Executar o comando `docker-compose -up`<br/>

##### Passo 3 (APIs Node.js):
1 - Criar e configurar os arquivos ".env". Para mais detalhes, acessar os links: [segurança](/sica-microservices-node/seguranca/README.md) e [comunicação](/sica-microservices-node/comunicacao/README.md)<br/>
2 - Abrir o diretório "pucminas/sica-microservices-node/" via linha de comando.<br/>
3 - Executar o comando `docker-compose -up` ou `docker-compose -up --build`<br/>

##### Passo 4 (Módulos web react):
1 - Criar e configurar os arquivos ".env". Para mais detalhes  acessar os links: [sica-admin-app](/sica-frontend/sica-admin-app/README.md) e [sica-morador-app](/sica-frontend/sica-morador-app/README.md)<br/>
2 - Abrir o diretório "pucminas/sica-frontend/" via linha de comando.<br/>
3 - Executar o comando `docker-compose -up` ou `docker-compose -up --build`<br/>

#### Portainer - Gerenciamento Docker WEB.
Solução para gerenciamento de recursos como imagens e containers Docker, networks e volumes.<br/>
##### Instalação:
`$ docker volume create portainer_data`<br/>
`$ docker run -d -p 9000:9000 -p 8000:8000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer`<br/>

Para mais informações, acesse: https://www.portainer.io/ e https://portainer.readthedocs.io/en/stable/<br/>

## Módulos Java
#### Apis feitas com Java e Spring boot:

#### Discovery

#### Gateway

#### Auth

#### Ativo

#### Processos Minerários - Workflow

#### Monitoramento

#### Hystrix-dashboard
Mais informação sobre os microserviços [java](/sica-microservices-java/README.md)

## Módulos Node.js
#### Apis feitas com Node.js

### Segurança:
Mais informação sobre api de [segurança](/sica-microservices-node/seguranca/README.md)

### Comunicação:
Mais informação sobre api de [comunicação](/sica-microservices-node/comunicacao/README.md)

# Paginas de acessos
## Módulo web administrativo
URL: http://localhost:3000/

## Módulo web de moradores
URL: http://localhost:3001/

## Eureka - Service Discovery
URL: http://localhost:8081/

## RabbitMQ
URL: http://localhost:9080/

## PgAdmin
URL: http://localhost:5050/

## Redis
URL: http://localhost:3333/admin/queues

## Hystrix Dashboard
URL: http://localhost:7979/hystrix/

## Portainer.
URL: http://localhost:9000/





