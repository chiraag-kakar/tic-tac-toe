import supertest from 'supertest';
import app from './App';
import { describe, it } from "mocha";

describe('App', () => {

    it('works', () =>
        supertest(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
    );

});
