console.log(process.execPath) // C:\Program Files\nodejs\node.exe
console.log(process.version) // Версия ноды v15.6.0
console.log(process.platform) // win32
console.log(process.arch) //x64
console.log(process.title) // MINGW64:/d/dev/node-js-goit-lessons/001-lesson/03-internal
console.log(process.pid) // Уникальный идентификатор процесса
console.log(process.cwd()) // из какого места я запустил программу D:\dev\node-js-goit-lessons\001-lesson\03-internal
console.log(process.argv) // получить массив аргументов консоли
// console.log(process.env) // все переменные окружения

process.on('hello', (str) => { // создал слушатель с именем hello
  console.log(str, "some str...");
})
process.emit('hello', "HELLO!!! =>") // вызвал слушателя и менем hello

process.on('exit', (code) => { // слушаеть на событие по иени exit
  console.log('Exit: ' + code)
})
process.exit(1) // когда происходит критическая ошибка можно завершить процесс 