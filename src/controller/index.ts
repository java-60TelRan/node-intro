import rateLimit from "express-rate-limit";
import express, { Request, Response, NextFunction } from 'express'
import { requestTime } from "../middleware/request-time.ts";
const app = express();
const port = 3500;
app.listen(port, () => console.log("server is listening on port " + port));

//third party middleware - specified in controller but not in the middleware folder
const limitRequests = rateLimit({
   max: 3,
   windowMs: 60 * 1000,
   message: "Too Many Requests"
})
app.use(requestTime)
app.post("/api/greet", limitRequests, (req: Request& {requestedAt: string}, res: Response) => {
   res.json({message: "Hello!", requestedAt: req.requestedAt});
})
app.get("/api/status", (req: Request& {requestedAt: string}, res: Response) => {
   res.json({status: "Up and Running", requestedAt: req.requestedAt});
} )
