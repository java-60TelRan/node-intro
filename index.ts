import { readFile, writeFile } from 'node:fs/promises';
writeFile("hello.txt", "Hello World").then(() => console.log("file created")).catch(er => console.log(er.message))