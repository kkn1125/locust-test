import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { beforeEach, describe, it } from 'vitest';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { fakerKO as faker } from '@faker-js/faker';

describe('User-Auth Controller (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/version (GET)', async () => {
    const email = faker.internet.email({ provider: 'example.com' });
    const password = faker.word.sample(20);
    const signupResult = await request(app.getHttpServer())
      .post('/users')
      .send({
        email,
        password,
      })
      .expect(200)
      .expect('0.0.1');

    expect(signupResult.body.success).toBeTruthy();

    const loginResult = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      });

    expect(loginResult.body.success).toBeTruthy();
  });
});
