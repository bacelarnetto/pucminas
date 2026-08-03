# Modernização do SICA Microservices

Projeto: Sistema de Gestão Ambiental (SICA) — PoC de pós-graduação PUC Minas (2019/2020).

## Objetivo

Atualizar o projeto para uma stack moderna e sustentável, substituindo todas as
dependências descontinuadas por alternativas equivalentes, mantendo a mesma
funcionalidade dos serviços.

## Stack atual → Alvo

| Camada | Atual (2019/2020) | Alvo (moderno) |
|---|---|---|
| Java | 11 | **21 (LTS)** |
| Spring Boot | 2.2.1.RELEASE | **3.3.x** |
| Spring Cloud | Hoxton.RC2 (release candidate) | **2023.0.x (Leyton)** |
| Persistência | javax.persistence | jakarta.persistence |
| Servlet | javax.servlet | jakarta.servlet |
| Validação | javax.validation | jakarta.validation |
| Service Discovery | Netflix Eureka | Netflix Eureka (mantido, sem deprecation no Spring Cloud 2023) |
| API Gateway | Zuul (`spring-cloud-starter-netflix-zuul`, descontinuado) | **Spring Cloud Gateway** (reativo) |
| Swagger | Springfox 2.9.2 (abandonado, incompatível com Boot 3) | **springdoc-openapi 2.x** |
| JWT | jjwt 0.9.1 | **jjwt 0.11.5** |
| Segurança | Spring Security 5 (`WebSecurityConfigurerAdapter`) | **Spring Security 6** (`SecurityFilterChain`/reativo) |
| Workflow | Camunda 3.4.0 (Boot 2.2) | **Camunda 7.23.0** (Boot 3) | nao fazer por enquanto
| Métricas | `org.springframework.metrics:spring-metrics` (arquivado) | Micrometer (gerenciado pelo Boot) |
| RabbitMQ | `spring-boot-starter-amqp:1.5.8.RELEASE` (fixado errado) | gerenciado pelo Boot 3 |
| Docker | `docker-compose` v3 (swarm) + imagens antigas | Compose v2 moderno, `localhost` em vez de IP de VM |

## Substituições de dependências deprecadas

| Dependência antiga | Status | Substituição |
|---|---|---|
| `org.springframework.cloud:spring-cloud-starter-netflix-zuul` | **descontinuada** | `spring-cloud-starter-gateway` (roteamento reativo por service-id via Eureka) |
| `io.springfox:springfox-swagger2` / `springfox-swagger-ui` | **abandonada** | `org.springdoc:springdoc-openapi-starter-webmvc-ui:2.6.0` |
| `io.jsonwebtoken:jjwt:0.9.1` | **descontinuada** | `jjwt-api`, `jjwt-impl`, `jjwt-jackson:0.11.5` |
| `org.springframework.metrics:spring-metrics:0.5.1.RELEASE` | **arquivada** | `micrometer-registry-prometheus` + actuator (gerenciados pelo Boot) |
| `org.springframework.boot:spring-boot-starter-amqp:1.5.8.RELEASE` (versão fixada manual) | **incompatível** | usar a versão gerenciada pelo Boot 3 |
| `com.spotify:docker-maven-plugin:0.4.10` | **descontinuada** | remover (Dockerfile próprio + Compose) |
| Repositório `spring-milestones` (para Hoxton.RC2) | **desnecessário** | removido (Spring Cloud 2023 está no Maven Central) |

> **Workflow/Camunda e Hystrix Dashboard** foram **removidos do build** nesta fase.
> Hystrix não tem substituto moderno (usar fallbacks explícitos, ex.: try/catch).
> Workflow será tratado separadamente com outra ferramenta (por isso o status fica em aberto).

## Principais mudanças de código

1. **Namespaces Java EE → Jakarta EE** (`javax.*` → `jakarta.*`) em entidades JPA,
   servlets, filtros de segurança e validação.
2. **Gateway Zuul → Spring Cloud Gateway**:
   - `@EnableZuulProxy` removido; roteamento automático por service-id
     (`spring.cloud.gateway.discovery.locator.enabled: true`).
   - Segurança servlet (`SecurityTokenConfig`, `JWTAuthorizationFilter`) substituída
     por filtro reativo (`SecurityWebFilterChain` + `WebFilter` JWT).
3. **Spring Security 6** no módulo `auth`:
   - `WebSecurityConfigurerAdapter` → `SecurityFilterChain`.
   - `antMatchers()` → `requestMatchers()`.
4. **Swagger**: `@EnableSwagger2` removido; `GroupedOpenApi` do springdoc.
   Anotações antigas `io.swagger.annotations.*` são mantidas apenas para compatibilidade
   de compilação (dep `io.swagger:swagger-annotations`).
5. **Infraestrutura**: IPs fixos `192.168.99.105` (Docker Toolbox) → `localhost`; senha de
   e-mail real removida do repositório (agora via variável de ambiente `MAIL_PASSWORD`).

## Como executar

1. Subir a infraestrutura (Compose v2):
   ```bash
   docker compose up -d
   ```
   Subir: `postgresauth` (5434), `postgresativo` (5432), `postgresbarragem` (5433),
   `pgadmin` (5050), `rabbitmq` (5672, console 9080), `redissegurancacomunicacao` (6379).
2. Compilar e rodar os serviços Java (JDK 21 + Maven 3.9):
   ```bash
   export JAVA_HOME=$(asdf where java); export PATH="$JAVA_HOME/bin:$PATH"
   mvn clean install
   # rodar os 5 jars (discovery primeiro) com `java -jar`, ou via IDE:
   discovery 8081 | monitoramento 8082 | auth 8083 | ativo 8084 | gateway 8080
   ```
   > O auth usa `ddl-auto=create`: a cada restart a base é recriada e o usuário deve
   > ser recriado: `POST http://localhost:8083/user` com `Authorization: x`
   > (ex.: `{"nome":"Admin","email":"admin@sica.com","senha":"12345"}`).
3. Subir os serviços Node:
   ```bash
   cp seguranca/.env.example seguranca/.env
   cp comunicacao/.env.example comunicacao/.env
   cd seguranca && npm install && npx sucrase-node src/server.js   # porta 3333
   cd comunicacao && npm install && npx sucrase-node src/server.js # porta 3334
   ```

### Validação end-to-end

```bash
# login através do gateway (frontend usa prefixo /api; o gateway reescreve
# /api/auth/** -> /**, /api/monitoramento/** -> /**, etc.)
TOKEN=$(curl -s -D - -o /dev/null -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sica.com","senha":"12345"}' | grep -i "^authorization:" | tr -d '\r' | sed 's/^[Aa]uthorization: *//')

curl -H "Authorization: $TOKEN" http://localhost:8080/api/ativo/marca/list       # -> []
curl -H "Authorization: $TOKEN" http://localhost:8080/api/monitoramento/barragem # -> []
curl http://localhost:8080/api/monitoramento/public/barragem                     # -> [] (sem token)
curl -X POST http://localhost:3333/barragem -H "Content-Type: application/json" \
  -d '{"id":1,"nome":"Barragem Teste"}'                                          # -> job na fila
```

## Ajustes encontrados na subida da stack (runtime)

| Problema | Correção |
|---|---|
| Gateway fat jar usava `spring-cloud-gateway-server 4.1.6` (exige Spring 6.2 / `HttpHeaders.headerSet()`) com Boot 3.3.5/Spring 6.1 | pin `spring-cloud-gateway-server:4.1.5` no `dependencyManagement` do pom raiz |
| Hibernate 6 rejeita JPQL `status = '1'` (Integer vs String) | literais numéricos em `BarragemRepository`, `FornecedorRepository`, `MarcaRepository` (`codigoCategoriaRisco= 3`) |
| CORS `allowCredentials(true)` + `allowedOrigins("*")` inválido no Spring 6 | `allowedOriginPatterns("*")` em 3 classes de config |
| `jjwt` HS512 rejeita secret < 64 bytes (o default tinha 37) | default ampliado em `JWTUtil` (≥64 bytes) |
| `PagingAndSortingRepository` não herda mais `CrudRepository` no Spring Data 3 | trocar por `JpaRepository` em `BarragemRepository`/`MonitoramentoRepository` |
| Bean `rabbitTemplate` duplicado (o Boot 3 já auto-configura e usa o `MessageConverter` bean) | remover o `@Bean rabbitTemplate` de `RabbitMqConfig` |
| Ciclo de dependência `authIntegration` ↔ `restAuthTemplate` (o `@Bean RestTemplate` estava no próprio `@Service`) | extrair para `RestTemplateConfig` (config dedicada) |
| Spring Security 6 usa `PathPatternParser`: padrões `/**/swagger-resources/**` (com `**` no meio) são inválidos | padrões válidos (`/swagger-ui/**`, `/v3/api-docs/**`, `/webjars/**`) |
| Gateway reativo ignora `server.servlet.context-path` (propriedade de servlet) | prefixo `/api` nas `Path=` predicates com `RewritePath=/api/<serviço>/(?<segment>.*), /${segment}` e nos matchers de segurança |
| Auth SecurityConfig não liberava `/login` (o gateway reescreve `/api/auth/**`→`/**`) | `/login/**` em `PUBLIC_MATCHERS`/`PUBLIC_MATCHERS_POST`; filtro no processamento padrão `/login` |
| 404 transitório no gateway após restart do auth | normal: o discovery locator re-sincroniza com o Eureka em ~30s; re-tentar |
| `@PostMapping("/")` do monitoramento não casa sem a barra final | usar `POST /monitoramento/api/monitoramento/` (com `/`) |

## Status

- [x] Diagnóstico do projeto
- [x] Atualização de poms (Boot 3.3, Spring Cloud 2023, Java 21)
- [x] Migração javax.* → jakarta.*
- [x] Spring Security 6 (auth) e gateway reativo
- [x] springdoc nos módulos
- [x] Configurações de infraestrutura (IPs, Compose v2, `MAIL_PASSWORD`, context path `/api` do gateway)
- [x] Compilação dos 7 módulos (`mvn verify` BUILD SUCCESS; testes JUnit 5 passando)
- [x] Subida da stack e validação dos endpoints (login, gateway, ativo, monitoramento, swagger)
- [ ] Workflow/Camunda: **adiado** (módulo fora do build; outra ferramenta)
- [ ] Hystrix Dashboard: **removido** (sem substituto moderno; fallbacks com try/catch)
- [ ] Serviços Node (seguranca/comunicacao) registrados no Eureka (pendente na revalidação)
