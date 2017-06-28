const expect = require('chai').expect;
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Record } = require('../models/record');

const records = [
  { _id: new ObjectID(), sugar: 5.5 },
  { _id: new ObjectID(), sugar: 7.0 },
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

describe('GET /records/:id', () => {
  it('should return record doc', (done) => {
    request(app)
      .get(`/records/${records[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.record.sugar).to.equal(records[0].sugar);
      })
      .end(done);
  });

  it('should return 404 if record not found', (done) => {
    const testId = new ObjectID();
    request(app)
      .get(`/records/${testId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if id is invalid', (done) => {
    const invalidId = '12345';
    request(app)
      .get(`/records/${invalidId}}`)
      .expect(404)
      .end(done);
  });
});
