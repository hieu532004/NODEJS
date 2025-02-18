import express, { NextFunction, Request, Response } from 'express';
import categoriesRouter from './routes/v1/categories.route';
import createErrors from 'http-errors';


/*------------||BEGIN INIT APP||-------------- */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*------------||BEGIN REGISTER ROUTES||-------------- */
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
//đăng ký một route từ file bên ngoài
app.use('/api/v1/', categoriesRouter);
/*------------||END HANDLE ROUTES||-------------- */

// NO EDIT BEGIN HERE
/*------------||BEGIN HANDLE ERRORS||-------------- */
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createErrors(404, 'Not found'));
});
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({ statusCode: statusCode, message: err.message });
});
/*------------||END HANDLE ERRORS||-------------- */

export default app; 
