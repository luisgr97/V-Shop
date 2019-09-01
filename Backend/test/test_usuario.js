//import App from '../src/app';
const App = require('../src/app');
const chai =  require('chai');
assert = chai.assert;

before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});

after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});

/* asyn test */
describe('#Synchronous user crud test', () => {
    describe('## get users', () => {
        it('get "users" record', done => {
            chai.request(App)
                .get('/usuario/get')
                .end(function (err, res) {
                    if (err) done(err);
                    done();
                    console.log('status code: %s, users: %s', res.statusCode, res.body.length)
                });
        }).timeout(0);
    });
    
    describe('## get Users', () => {
        it('## get users list', done => {
            chai.request(App)
                .get('/usuario/get/1')
                .end(function (err, res) {
                    if (err) done(err);
                    done();
                    console.log('status code: %s, users: %s', res.statusCode, res.body.length)
                });
        }).timeout(0);
    });
});