const {info, logger} = require('./module')
const MyModule = require('./moduleClass')

info('info')
logger('logger')

const myModule = new MyModule()
myModule.info('info myModule')
myModule.logger('logger myModule')