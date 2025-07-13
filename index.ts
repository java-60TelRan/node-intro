import { readFile, writeFile } from 'node:fs/promises';
readFile(process.argv[1] , {encoding: "utf8"}).then(content => console.log(content)).catch(er => console.log(er.message))