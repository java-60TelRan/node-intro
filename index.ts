// import {Readable, Writable, Transform} from "node:stream";
// import {pipeline} from "node:stream/promises"
// import { TransformCallback } from "stream";
// class NumbersStream extends Readable {
//    private _counter = 0;
//     constructor() {
//         super({objectMode: true})
//     }
//     _read(): void {
//         this.push(this._counter++)
//     }
// }
// class EvenNumbers extends Transform {
//     constructor() {
//         super({objectMode: true})
//     }
//     _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
//         if (chunk % 2 == 0) {
//             this.push(chunk);

//         }
//         callback()
//     }
// }


//     }
// }
// class OutputNumbers extends Writable {
//     constructor() {
//         super({objectMode: true})
//     }
//     _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
//         process.stdout.write(chunk + "; ");
//         callback();
//     }
//     _final(callback: (error?: Error | null) => void): void {
//         process.stdout.write("\n", callback)
//     }
// }
// async function displayEvenNumbers(count: number): Promise<void> {
//     await pipeline(
//         new NumbersStream(),
//         new EvenNumbers(),
//         new Limit(count),
//         new OutputNumbers()
//     )
// }
// displayEvenNumbers(100).catch(err => console.log(err));
import displayUniqueRandomNumbers from "./display_unique_numbers.ts";
import config from "config";
interface Params {
  minValue: number;
  maxValue: number;
  amount: number;
  delimiter: string
}
const MIN_VALUE_CONFIG_NAME = "min";
const MAX_VALUE_CONFIG_NAME = "max";
const AMOUNT_VALUE_CONFIG_NAME = "amount";
const DELIMITER_VALUE_CONFIG_NAME = "delimiter";
 const DEFAULT_DELIMITER_VALUE = "; ";
const DEFAULT_MIN_VALUE = 1;
const DEFAULT_MAX_VALUE = 49;
const DEFAULT_AMOUNT = 7;
function getParams(): Params {
  const minValue = getParamNumber(MIN_VALUE_CONFIG_NAME, DEFAULT_MIN_VALUE);
  const maxValue = getParamNumber(MAX_VALUE_CONFIG_NAME, DEFAULT_MAX_VALUE);
  const amount = getParamNumber(AMOUNT_VALUE_CONFIG_NAME, DEFAULT_AMOUNT);
  const delimiter = getParamString(DELIMITER_VALUE_CONFIG_NAME, DEFAULT_DELIMITER_VALUE);
  return { minValue, maxValue, amount, delimiter };
}
function getParamNumber(configName: string, defaultValue: number): number {
  const res: number = config.has(configName)
    ? config.get<number>(configName)
    : defaultValue;
  if (typeof res != "number") {
    throw new Error(
      `Value of ${configName} parameter is "${res}" but must be a number`
    );
  }
  return res;
} 
function getParamString(configName: string, defaultValue: string): string {
     const res: string = config.has(configName)
    ? config.get<string>(configName)
    : defaultValue;
  if (typeof res != "string") {
    throw new Error(
      `Value of ${configName} parameter is "${res}" but must be a string`
    );
  }
  return res;
}
(async () => {
  try {
    await displayUniqueRandomNumbers(getParams());
  } catch (error) {
    console.log(error.message);
  }
})();
