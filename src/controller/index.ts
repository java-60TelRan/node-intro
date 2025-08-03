
import { validation } from '../middleware/validation.ts';
import CalculationData from '../model/CalculationData.ts';
import calculator, { WrongOperationError } from '../service/calculator.ts'
import express ,{Response, Request, NextFunction} from 'express'
import morgan from 'morgan';
import 'dotenv/config'
const port = process.env.PORT || 3500;




const app = express();
app.listen(port, () => console.log(port));
app.use(express.json());
app.use(morgan('tiny'))
app.use(validation)
app.post("/api/calculator", (req: Request & {error: Error}, res: Response) => {
 
    const result = calculator.calculate(req.body as CalculationData)
    sendResponse(res, 200, result);
 
})
app.get("/api/calculator",  (req: Request & {error: Error}, res: Response) => {
   
    const result = calculator.calculate(req.query as any)
    sendResponse(res, 200, result);
  })
app.get("/api/calculator/:operation/:op1/:op2", validation, (req: Request & {error: Error}, res: Response) => {
   
    const result = calculator.calculate(req.params as any)
    sendResponse(res, 200, result);



})
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
const status = error instanceof WrongOperationError ? 404 : 400;
   sendResponse(res, status, error.message)
})
function sendResponse(res: Response, status: number, result: number | string) {
      res.statusCode = status;
      res.send(result)
}

