import express, { NextFunction, Request, Response } from 'express';
import createErrors from 'http-errors';
//imoport route từ file bên ngoài
import categoriesRouter from './routes/v1/categories.route';
import brandsRouter from './routes/v1/brands.route';
import queriesRouter from './routes/v1/queries.route'


/*------------||BEGIN INIT APP||-------------- */
const app = express();
app.use(express.json());

/*------------||BEGIN REGISTER ROUTES||-------------- */
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
//đăng ký một route từ file bên ngoài
app.use('/api/v1/', brandsRouter);
app.use('/api/v1/', categoriesRouter);
app.use('/api/v1/', queriesRouter)
/*------------||END HANDLE ROUTES||-------------- */

// NO EDIT BEGIN HERE
/*------------||BEGIN HANDLE ERRORS||-------------- */
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createErrors(404, 'Not found'));
});
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message,
        data: null

    });
});
/*------------||END HANDLE ERRORS||-------------- */

export default app; 
