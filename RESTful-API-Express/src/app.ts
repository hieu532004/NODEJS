import express, { NextFunction, Request, Response } from 'express';
import createErrors from 'http-errors';
//imoport route từ file bên ngoài
import categoriesRouter from './routes/v1/categories.route';
import brandsRouter from './routes/v1/brands.route';
import queriesRouter from './routes/v1/queries.route'
import productsRouter from './routes/v1/product.route'
import saffsRouter from './routes/v1/staffs.route'
import authRouter from './routes/v1/auth.route'
import compression from 'compression';


/*------------||BEGIN INIT APP||-------------- */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/*------------||END INIT APP||-------------- */

// nén dữ liệu trước khi gửi cho client
app.use(compression());

//Tự định nghĩa một middleware
const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('this is middleware', 'App middleware');
    //kết thúc logic của middleware 
    //Chuyển hướng cho Middleware tiếp theo
    next();
}

const myMiddleware2 = (req: Request, res: Response, next: NextFunction) => {
    console.log('this is middleware 2')
    next();
}
//Cách sử dụng middleware 
app.use(myMiddleware);
app.use(myMiddleware2);

/*------------||BEGIN REGISTER ROUTES||-------------- */
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
//đăng ký một route từ file bên ngoài
app.use('/api/v1/', brandsRouter);
app.use('/api/v1/', categoriesRouter);
app.use('/api/v1/', queriesRouter)
app.use('/api/v1/', productsRouter)
app.use('/api/v1/', saffsRouter)
app.use('/api/v1/auth', authRouter)
/*------------||END HANDLE ROUTES||-------------- */

// NO EDIT BEGIN HERE
/*------------||BEGIN HANDLE ERRORS||-------------- */
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createErrors(404, 'Not found'));
});
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message,
        data: null
    });
});
/*------------||END HANDLE ERRORS||-------------- */

export default app; 
