import {info, logger} from './module.mjs'
import MyModule from './moduleClass.mjs'

info('Hello')
logger('Hello')

const myModule = new MyModule()
myModule.info('class')
myModule.logger('class')