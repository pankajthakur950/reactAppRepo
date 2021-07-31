const fs = require('fs');
const util = require('util');
const fs_readdir = util.promisify(fs.readdir);
(
  async () => {
    var dir = '.';
    if (process.argv[2]){
      console.log("coming here----"+process.argv[2]);
      dir = process.argv[2];
    }
    const files = await fs_readdir(dir);
    for (let fn of files) {
      console.log(fn);
    }
  }
)().catch(
    err => {
      console.error(err);
  });
