const fs = require('fs')

console.log('Начало работы')

setTimeout(() => {
  console.log('setTimeout happened')
}, 0)

setImmediate(() => {
  console.log('immediate happened')
})

Promise.resolve().then(() => console.log('promise 1 happened'))

Promise.resolve().then(() => {
  console.log('promise 2 happened')
  process.nextTick(() => {
    console.log('nextTick in promise 2 happened')
  })
})

Promise.resolve().then(() => console.log('promise 3 happened'))

new Promise((resolve) => {
  resolve('Promise happened')
  process.nextTick(() => {
    console.log('nextTick before')
  })
}).then(console.log)

process.nextTick(() => {
  console.log('nextTick 1 happened')
})
process.nextTick(() => {
  console.log('nextTick 2 happened')
})
process.nextTick(() => {
  console.log('nextTick 3 happened')
})

fs.readFile(__filename, () => {
  // В callback первым будет setImmediate
  setTimeout(() => {
    console.log('timeout in callback')
  }, 0)
  setImmediate(() => {
    console.log('immediate in callback')
  })
})

console.log('Конец файла')

/*
  nextTick всегда будет первым потому что в конце текущего цикла
  Promise в начале следущего 100% выполнится потому что это микротаск, а они идут вне цикла
  потом пойдут setTimeout/setInterval и setImmediate (первыми будут выполнены )
  setTimeout/setInterval и setImmediate в разных стеках!
*/