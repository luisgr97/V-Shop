var App = require('../src/app');
const chai =  require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});

after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});

/* asyn test */
    describe('## get users', () => {
        it('get "users" record', done => {
            chai.request('http://localhost:5000')
                .get('/usuario/get')
                .end(function (err, res) {
                       if (err){
                        done(err);
                       }else {
                        done();
                       }
                });
        }).timeout(0);
    });


/* asyn test */
describe('## update users', () => {
    it('update "users" record', done => {
        chai.request('http://localhost:5000')
            .put('/usuario/update/1')
            .send({    
                       tipo_documento: 'CC',
                       numero_documento: '1245874524',
                       nombres: 'Esneider',
                       apellidos: 'Manzano',
                       telefono: '3124578954',
                       direccion: 'cr 2B # 70B-89',
                       correo: 'Correo@gmail.com',
                       clave: 'Claveupdate'
                     })
            .end(function (err, res) {
                   if (err){
                    done(err);
                   }else {
                    done();
                   }
            });
    }).timeout(0);
});

/* asyn test */
describe('## login users', () => {
    it('login "users" record', done => {
        chai.request('http://localhost:5000')
            .post('/usuario/login')
            .send({    
                       nick: '',
                       clave: ''
                     })
            .end(function (err, res) {
                   if (err){
                    done(err);
                   }else {
                    done();
                   }
            });
    }).timeout(0);
});