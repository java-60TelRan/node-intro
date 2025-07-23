//FIXME 
//A right solution allowing automation of writing data in Writable stream should be done using pipe
// between Readable (as a producer) and Writable (as a consumer)
import { createWriteStream } from "fs";
const writeStream = createWriteStream("large_file",{highWaterMark: 1024 * 1024 * 10});
const max = 1_000_000;
let index = 0;

function write() {
    let canWrite = true;
    while (canWrite && index < max) {
        canWrite = writeStream.write("Hello".repeat(1000));
        index += 5;
    }
    if(index < max) {
        writeStream.once("drain", write)
    }

}
write();
