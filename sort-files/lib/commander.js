import commander from 'commander';
const {Command} = commander
const program = new Command();

export default program
  .version('0.0.1')
  .requiredOption('-f, --folder <type>', 'Input folder')
  .option('-o, --output [type]', 'Output folder', './dist')
  .option('-d, --delete', 'Delete input folder')

  // $ node app.js -f picture -o sortpicture -d
  // { output: 'sortpicture', folder: 'picture', delete: true }
  /*
  $ node app.js -h
  Usage: app [options]
  Options:
    -V, --version        output the version number
    -f, --folder <type>  Input folder
    -o, --output [type]  Output folder (default: "./dist")
    -d, --delete         Delete input folder
    -h, --help           display help for command
  */