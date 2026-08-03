# Modernização do SICA Microservices Node

Projeto: Sistema de Gestão Ambiental (SICA) — PoC de pós-graduação PUC Minas (2019/2020).

Serviços Node que orquestram os alertas de barragens por fila (Bull + Redis), RabbitMQ,
e-mail (nodemailer), push (OneSignal) e WebSocket (socket.io).

## Objetivo

Atualizar os dois serviços Node (`seguranca` e `comunicacao`) para uma stack moderna e
sustentável, removendo dependências descontinuadas e frágeis (instaladas de GitHub),
mantendo a mesma funcionalidade. Complementa a modernização dos serviços Java
(ver `MODERNIZACAO.md`).

## Stack atual → Alvo

| Camada | Atual (2019/2020) | Alvo (moderno) |
|---|---|---|
| Node | 8/10 (2019) | **22 LTS** (mín. 20 — atual do ambiente de dev) |
| Servidor HTTP | Express 4.17.1 | **Express 4.22.x** (conservador) ou 5.x (opcional) |
| Body parsing | `body-parser` 1.19 | `express.json()` (remover dependência) |
| HTTP client | `axios` 0.19.2 | **`axios` 1.x** |
| Filas | `bull` 3.13 | **`bull` 4.16** (mesma API, drop-in) ou BullMQ 6 (estratégico) |
| Painel de filas | `bull-board` 0.6 (abandonado) | **`@bull-board/express` 8.x** |
| Resiliência | `simplified-hystrixjs` (puxa `brakes` de GitHub) | **remover** (fallback com try/catch) — coerente com a remoção do Hystrix no Java |
| Service discovery | `eureka-js-client` 4.5 (usa `request` deprecado) | **helper próprio com `fetch` nativo** (remove o `request` e as vulnerabilidades críticas) |
| RabbitMQ | `amqplib` 0.5.5 | **`amqplib` 2.x** (API compatível) |
| Realtime | `socket.io` 2.3 (server) | **2.5.0** (último 2.x) ou **4.8.x** (exige atualizar o app mobile) |
| E-mail | `nodemailer` 6.4 | **`nodemailer` 9.x** |
| Push | pacote `request` (deprecado) | **`fetch` nativo (Node 20+)** ou axios |
| Swagger | `swagger-ui-express` 4.1 | **5.x** |
| Variáveis de ambiente | `dotenv` 8.2 | **`dotenv` 17.x** |
| CORS | `cors` 2.8.5 | 2.8.6 (sem mudança) |
| Watch/transpiler | `nodemon` 2 + `sucrase` 3 | `nodemon` 3 + **ESM nativo** (fase 2, opcional) |
| Orquestração de scripts | `npm-run-all` 4 | remover (desnecessário) |
| Docker | `node:alpine` (sem tag) | **`node:22-alpine`** + install reprodutível |
| Compose | `version: '3.1'` (legado) | Compose v2 (remover `version:`) |

## Substituições de dependências

| Dependência | Status | Substituição |
|---|---|---|
| `simplified-hystrixjs` 1.0.16 | frágil (instala `brakes` via `github:julekgwa/brakes`; expõe `/actuator/hystrix.stream` que perdeu utilidade com o fim do Hystrix Dashboard no Java) | **remover**; fallback explícito com try/catch em `MoradorService` |
| `bull-board` 0.6.0 | **abandonada/deprecada** | `@bull-board/express` (rotas `/admin/queues` preservadas) |
| `request` (indireto em `PushNotification.js`) | **deprecado** | `fetch` nativo do Node 20+ (ou `axios`) |
| `body-parser` 1.19 | desnecessário no Express moderno | `express.json()` |
| `socket.io` 2.3 | antigo (protocolo v4/EIO3); não é compatível com o cliente v2 do app mobile se migrar para v4 | decidir: `2.5.0` (sem tocar no app) vs `4.8.3` (atualizar `sicamobile` para `socket.io-client` 4) |
| `eureka-js-client` 4.5 | sem manutenção desde 2022; puxa `request` deprecado **com vulnerabilidades críticas no `npm audit`** | **removido** → `eureka-helper.js` reescrito com `fetch` nativo (POST `/eureka/apps/{app}`, heartbeat PUT a cada 30s, DELETE no SIGINT) — mesmo comportamento do cliente original |
| `sucrase` 3 | funcional, mas desnecessário em Node 20+ | **ESM nativo** (`"type": "module"` + `export default`), fase 2 |
| Segredos do OneSignal hardcoded | exposto no repositório | variáveis de ambiente `ONE_SIGNAL_REST_KEY` / `ONE_SIGNAL_APP_ID` |

## Principais mudanças de código

1. **Remover `simplified-hystrixjs`**:
   - `seguranca/src/servers/morador.js`: envolver a chamada axios em try/catch (fallback já existente no caller).
   - `seguranca/src/config/middlewares.js` e `comunicacao/src/server.js`: remover
     `createHystrixStream`/`getPrometheusStream` (e o endpoint `/actuator/hystrix.stream`).
2. **`bull-board` → `@bull-board/express`**: trocar `BullBoard.setQueues(...)` / `BullBoard.UI`
   por `createBullBoard` + `ExpressAdapter` (`router` em `/admin/queues`).
3. **`body-parser` → `express.json()`** em `seguranca/src/config/middlewares.js`.
4. **`PushNotification.js`**: trocar `request` por `fetch` nativo; mover `restKey`/`appID`
   para `process.env` (remover segredo do código).
5. **`socket.io`**: manter `io.listen(port)` (compatível com v2.5 e v4); na prática, a mudança
   só existe se adotar v4, que exige atualizar o cliente no `sicamobile`.
6. **`eureka-helper.js`**: **reescrito sem `eureka-js-client`** usando `fetch` nativo —
   registra `POST /eureka/apps/{app}` (JSON `{ instance }`, espera 204), heartbeat
   `PUT /eureka/apps/{app}/{hostName}` a cada 30s (re-registra se 404), `DELETE` no
   SIGINT/SIGTERM; `ipAddr = IP_ADDR || HOSTNAME`; retry a cada 10s enquanto o Eureka
   estiver indisponível. Assinatura preservada: `registerWithEureka(appName, PORT)`.
7. **Pacotes**: `bull` 3→4 (config `{ redis: {...} }` segue igual), `axios`→1.x,
   `amqplib`→2.x, `nodemailer`→9.x, `dotenv`→17.x, `nodemon`→3.x,
   `swagger-ui-express`→5.x.
8. **Dockerfiles**: `node:22-alpine`; instalação com `yarn install --frozen-lockfile` (ou
   `npm ci`); comando de produção direto (`node src/server.js`), sem `nodemon`.
9. **docker-compose.yml**: remover `version: '3.1'`; manter portas `3333`, `3334`, `3335`.
10. **`.env.example`**: criar para cada serviço (hoje não existem; só o README lista as vars).
11. **Jenkinsfile**: caminhos hardcoded `/home/flavio/applications/...` — parametrizar ou
    documentar a dependência de ambiente.
12. **ESM nativo (fase 2, opcional)**: `"type": "module"`, converter `module.exports` → `export
    default` (`routes.js`, `SegurancaReceive.js`, `AlertController.js`, `middlewares.js`,
    `SegurancaTask.js`, jobs), remover `sucrase`/`nodemon.json`.

## Decisões em aberto

| Decisão | Recomendado | Impacto |
|---|---|---|
| Express 4.21 vs 5.x | **4.21.x** (drop-in) | 5.x quebraria alguns middlewares (ex.: swagger-ui-express); pode ficar para fase 2 |
| socket.io 2.5 vs 4.8 | **2.5.0** (não mexe no `sicamobile`) | v4 exige `socket.io-client` 4 no app mobile (migração fora do escopo Node) |
| Bull 4 vs BullMQ 6 | **Bull 4** (mesma API, sem reescrita) | BullMQ exige reescrever `app/lib/Queue.js` nos DOIS serviços juntos (formatos de fila incompatíveis entre Bull e BullMQ) |

## Como executar

1. Subir a infraestrutura (Compose v2 de `sica-infra`): Redis (6379), RabbitMQ (5672), Eureka (8081).
2. Em cada serviço:
   ```bash
   cd seguranca            # e comunicacao
   cp .env.example .env    # criar se ainda não existir
   yarn install            # ou npm install (ambiente atual sem yarn)
   yarn start              # seguranca: 3333 | comunicacao: 3334 + socket 3335
   ```
3. Registro no Eureka: `seguranca` e `comunicacao` aparecem em `http://localhost:8081/eureka/apps`.

### Validação end-to-end

```bash
# enfileira AlertMail + PushNotification (seguranca → Bull no Redis)
curl -X POST http://localhost:3333/barragem \
  -H "Content-Type: application/json" -d '{"id":1,"nome":"Barragem Teste"}'   # -> {"id":1,...}

# painel das filas (Bull Board)
http://localhost:3333/admin/queues

# processamento (comunicacao) envia e-mail via nodemailer; push via OneSignal
# job AlertBarragem emite no socket 3335 (evento "barragem")

# swagger
http://localhost:3333/api-docs/
```

## Ajustes encontrados e resolvidos na subida (runtime)

| Problema | Correção |
|---|---|
| `simplified-hystrixjs` falha o `npm install` em ambiente sem acesso a GitHub (dependência `brakes` via URL) | removida |
| `bull-board` 0.6 quebra no Express moderno | `@bull-board/express` (import correto: `createBullBoard` vem de `@bull-board/api`, não de `@bull-board/express`) |
| `socket.io` 2.3 gera alertas no Node 20+ | 2.5.0 (último da linha 2.x) |
| `eureka-js-client` → `request` → **2 críticos** no `npm audit` (SSRF) | helper próprio com `fetch`; **0 vulnerabilidades** em `seguranca` |
| advisory novo de `uuid` `<11.1.1` (GHSA-w5hq-g745-h8pq) via `bull` | `overrides: { "uuid": "^11.1.1" }` (uuid 11 mantém build CJS, `require('uuid')` continua funcionando no bull) |
| cadeia `socket.io` 2.5 (`socket.io-parser` 3.4, `engine.io`, `parseuri` — moderate/low) | **risco aceito**: não há patch na linha 2.x (parseuri só corrige no major 3.0, incompatível com EIO3); mitigação = fase 2 (sicamobile + socket.io 4) |
| `AlertBarragem.js` faz `io.listen(3335)` como side-effect do import do módulo | pré-existente; não afeta a app (porta única por processo) |
| WebSocket: app mobile (cliente socket.io 2) não conecta se o servidor subir para v4 | mantido 2.5.0 |

## Status

- [x] Diagnóstico dos serviços Node (seguranca/comunicacao)
- [x] Atualização de dependências (`package.json` + lockfiles)
- [x] Remoção de `simplified-hystrixjs` e `bull-board` → `@bull-board/express`
- [x] `body-parser` → `express.json()`; `request` → `fetch` nativo
- [x] Segredos do OneSignal para variáveis de ambiente
- [x] `eureka-js-client` → helper com `fetch` nativo (0 críticos no audit)
- [x] Dockerfiles e docker-compose atualizados
- [x] `.env.example` e READMEs dos serviços
- [x] Subida da stack e validação das filas (Bull/Rabbit) e WebSocket
- [ ] (Fase 2) ESM nativo, remoção de `sucrase`
- [ ] (Fase 2) `sicamobile` + `socket.io` 4.x (limpa audit do comunicacao)
- [ ] (Fase 2) Jenkinsfile parametrizado

### Validação realizada (2026-08-03)

- `seguranca` sobe em 3333, registra no Eureka (`SEGURANCA`/UP via `fetch`), `/admin/queues` 200,
  `POST /barragem` responde `{"id":1,"nome":"Barragem Teste"}` e dispara o fluxo de alerta.
- `comunicacao` sobe em 3334, registra no Eureka (`COMUNICACAO`/UP), socket 3335 aberto.
- Worker Bull processa `AlertMail` (nodemailer tenta envio — credencial placeholder do
  `.env.example` retorna `535 Invalid login`, esperado) e `AlertBarragem` (emite no socket).
- Heartbeat Eureka confirmado (PUT 200, case-insensitive).
- `npm audit`: `seguranca` **0 vulnerabilidades**; `comunicacao` só a cadeia socket.io 2.x (aceita).
