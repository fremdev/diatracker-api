const expect = require('chai').expect;
const request = require('supertest');

const { app } = require('../server');
const { Record } = require('../models/record');

const records = [
  { sugar: 5.5 },
  { sugar: 7.0 },
];

beforeEach((done) => {
  Record.remove({})
    .then(() => Record.insertMany(records))
    .then(() => done());
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
        Record.find()
          .then((result) => {
            expect(result).to.have.lengthOf(3);
            expect(result[2].sugar).to.equal(sugar);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create a record if body is empty', (done) => {
    request(app)
      .post('/record')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Record.find()
          .then((result) => {
            expect(result).to.have.lengthOf(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /records route', () => {
  it('should receive all records', (done) => {
    request(app)
      .get('/records')
      .expect(200)
      .expect((res) => {
        expect(res.body.records).to.have.lengthOf(2);
      })
      .end(done);
  });
});
