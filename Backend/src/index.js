import app from './app';

async function main(){
    await app.listen(4001);
    console.log('Server on port 5000');
};

main();

