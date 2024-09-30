import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import config from './app/config';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: config.cors_origin, // Add specific allowed origins
    credentials: true, // Allow credentials (cookies, headers)
  }),
);

// Application routes
app.use('/api', router);

const test = async (req: Request, res: Response) => {
  res.send(
    'Welcome to Flexispace | Meeting Room Booking System for Co-working spaces APIs!',
  );
};

app.get('/', test);

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
