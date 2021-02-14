const path = require('path')

console.log(path.sep) // \ в зависимости от ОС
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')) // нужно от одного пути построить путь к другому пути ..\..\impl\bbb
console.log(path.resolve('/foo/bar', './baz')) //всегдп строит абсолютный путь D:\foo\bar\baz
console.log(path.normalize('/foo/bar//baz/asdf/quux/..')) //рекоммендуется исопльзовать для путей хранящихся в базе данных \foo\bar\baz\asdf
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\')) //C:\temp\foo\
console.log(path.parse('/home/user/dir/file.txt')) // разложит путь на объект
/*
{
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')) // тут normalize и path.sep под капотом \foo\bar\baz\asdf