# Seed Template - Nest.js

NestJS 기본 템플릿

## 필수 의존 설치

```bash
npm i cookie-parser compression dayjs @nestjs/config class-validator class-transformer @nestjs/swagger

npm i -D @types/cookie-parser tsconfig-paths @types/compression

npm i -D vitest vite-tsconfig-paths vitest

npm i -D @types/multer # 파일 업로드 / 응답 시 Buffer.from으로 감싸야 이미지 정상 응답
```

### 선택 의존 설치

```bash
npm -D i @faker-js/faker # faker
npm i @nestjs/axios axios
npm i bcrypt # 보안 - 비밀번호 암호화
npm i @nestjs/event-emitter # 이벤트 기반
npm i compression # 압축
npm i @nestjs/schedule # 스케쥴러
npm i @nestjs/cache-manager cache-manager # 캐싱
npm i @nestjs/throttler # 쓰로틀링
npm i @nestjs/websockets @nestjs/platform-socket.io # 웹소켓
npm i amqplib amqp-connection-manager # RabbitMQ 메세징
npm i @nestjs-modules/ioredis ioredis # Redis

npm i express-session
npm i -D @types/express-session 

npm i jsonwebtoken # JWT
npm i -D @types/jsonwebtoken

npm i sharp # 이미지 상세 처리
npm i -D @types/sharp

# TypeORM (최근 데이터 손실 문제 등으로 비전에 대해 말이 많음)
npm install --save @nestjs/typeorm typeorm mysql2
npm install typeorm-extension --save # seeding 도구
# Or
# Prisma
npm install @prisma/client prisma prisma-class-generator --save-dev
npx prisma init
npm i prisma-class-generator # 클래스 생성기
npm i -D prisma-erd-generator @mermaid-js/mermaid-cli # https://www.npmjs.com/package/prisma-erd-generator

npm i -D @compodoc/compodoc # Nestjs 프로젝트 문서화 빌드
# npx @compodoc/compodoc -p tsconfig.json -s 생성
```

[Redis Installation](https://www.npmjs.com/package/@nestjs-modules/ioredis)
