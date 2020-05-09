# Módulos Java

## Discovery
API que usa Eureka Server. Contém as informações sobre todos os aplicativos clientes (Microserviços registrados no servidor Eureka). 

## Gateway
Zuul API Gateway. Ele lida com todas as solicitações e executa o roteamento dinâmico dos  microsserviços. Funciona como uma porta da frente para todos os pedidos.

## Auth
API responsável pelo controle de usuários como cadastro, alteração e exclusão, autenticação e autorização dos mesmos.

## Ativo

API responsável pelo controle de insumos da empresa como cadastro, alteração, exclusão, manuteções e pedidos afornecedores dos mesmos.

## Workflow
API responsável pelo controle de processos da empresa mineraria.

## Monitoramento

API responsável por monitorar os estados das barragens cadastradas.

## Hystrix Dashboard
Api que auxilia no monitoramento das integrações dos microsserviços.<br/>
URL: http://localhost:7979/hystrix/








