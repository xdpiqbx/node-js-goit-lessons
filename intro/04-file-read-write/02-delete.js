const fs = require('fs')

fs.unlink('temp/path.js', (err) => {
  if (err) {
    console.log(err)
    return
  }

  fs.rmdir('temp', (err) => { // директорию можно удалить только пустую!
    if (err) {
      console.log(err)
      return
    }
    console.log('Delete done!')
  })
})
