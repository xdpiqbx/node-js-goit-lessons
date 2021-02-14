const os = require('os')

console.log(`Host name: ${os.hostname()}`);
console.log(`Type operation system: ${os.type()}`);
console.log(`Platform: ${os.platform()}`);
console.log(`Version: ${os.release()}`);
console.log(`Working time: ${os.uptime()}`); //14344
console.log(`Working time: ${(os.uptime() / 60 / 60).toFixed(2)} hours`); // 4.21
console.log(`Processor arch: ${os.arch()}`);
console.log(`Processors: ${os.cpus().length}`);
console.log(`Memory: ${os.totalmem()}`); //68 652 519 424
console.log(`Memory: ${(os.totalmem() / 1e9).toFixed(2)}`); //68.65
console.log(`Free memory: ${os.freemem()}`); // 63 836 078 080