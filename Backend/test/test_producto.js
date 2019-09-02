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
    describe('## create producto', () => {
        it('create "producto" record', done => {
            chai.request('http://localhost:5000')
                .post('/api/productos/create')
                .send({    
                    nombre_producto: 'Producto Test',
                    descripcion: 'prodcuto para testar',
                    marca: "El mas fino",
                    precio: 5000,
                    id_subcategoria: 1
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

