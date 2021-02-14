import * as fs from 'fs/promises'
import { isAccessible } from './lib/accessible.js'
import SortFiles from './module/sort.js'
import program from './lib/commander.js'
import { handleError } from './lib/handlerror.js'
import { resolve } from 'path'
import createDirname from './lib/dirname.js'

const { __dirname } = createDirname(import.meta.url)
program.parse(process.argv)

console.log(program.opts());


const output = program.opts().output
// если нету папки которую передали параметром output она будет создана 
if (!(await isAccessible(output))){
  await fs.mkdir(output)
}

try{
  const sorting = new SortFiles(output)
  await sorting.readFolder(resolve(__dirname, program.opts().folder))
} catch(e){
  handleError(e)
}

console.log('Done. We can delete source folder')