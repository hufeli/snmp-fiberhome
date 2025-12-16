const fh = require('./snmp-fiberhome');
console.log('Module loaded successfully');

// Mocking global functions or just checking if it runs
async function run() {
    try {
        console.log('Calling getBasicPonPortList...');
        // This is expected to fail because of missing options/network
        const result = await fh.getBasicPonPortList({
             ip: '127.0.0.1',
             community: 'public',
             version: 1
        }); 
        console.log('Result:', result);
    } catch (err) {
        console.log('Caught expected error:', err.message);
    }
}

run();
