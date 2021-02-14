const fs = require('fs')
const file = '../03-internal/02-path.js'

console.log(__dirname) // путь к текущему скрииту
console.log(__filename) // имя файла

fs.readFile(file, (err, data) => {
  // читаю всё из file и если нет ошибки всё будет в data
  if (err) {
    console.error(err.message)
    return
  }

  if (!fs.existsSync('./temp')) { // проверяю существует ли папка
    // Sync говорит о том что это синхронная операция и её callbackне нужен
    fs.mkdirSync('./temp') // если папки нет - создаю
  }

  fs.writeFile(
    './temp/path.js', // всё пишу в path.js (файл будет создан)
    `${data.toString()}\nconsole.log('Successfully updated')`,
    // дописываю в data строку и вё это будет сохранено в ./temp/path.js
    (err) => {
      if (err) {
        console.log(err)
        return
      }
    },
  )
})

// Под нодой console.error и console.log это разные вещи !!!

//https://youtu.be/UK65gJgYYfg?t=3591