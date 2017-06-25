const expect = require('chai').expect;
const request = require('supertest');

const { app } = require('../server');
const { Record } = require('../models/record');

beforeEach((done) => {
  Record.remove({}).then(() => done());
});

describe('POST /record', () => {
  it('should create a new record', (done) => {
    const sugar = 9.9;

    request(app)
      .post('/record')
      .send({ sugar })
      .expect(200)
      .expect((res) => {
        expect(res.body.sugar).to.be.a('number');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Record.find().then((records) => {
          expect(records).to.have.lengthOf(1);
          expect(records[0].sugar).to.equal(sugar);
          done();
        })
        .catch(err => done(err));
      });
  });

  it('should not create a record if body is empty', () => {

  });
});
