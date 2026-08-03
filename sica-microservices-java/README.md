# Módulos Java

## Discovery
API que usa Eureka Server. Contém as informações sobre todos os aplicativos clientes (Microserviços registrados no servidor Eureka). 

## Gateway
Spring Cloud Gateway (reativo). Ele lida com todas as solicitações e executa o roteamento dinâmico dos microsserviços. Funciona como uma porta da frente para todos os pedidos.

## Auth
API responsável pelo controle de usuários. Principais funcionalidades: cadastro, alteração e exclusão, autenticação e autorização.

## Ativo
API responsável por gerir os ativos da empresa. Principais funcionalidades: cadastro, alteração, exclusão, manutenções e pedidos de insumos.

## Monitoramento
API responsável por monitorar e coletar informações das barragens cadastradas.

## Token
Lib compartilhada de autenticação JWT usada pelos demais módulos.








