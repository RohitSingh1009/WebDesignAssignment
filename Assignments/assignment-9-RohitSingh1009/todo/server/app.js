import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import model from './models';
import routes from './routes';

const app = express();
// mongoose instance connection url connection with the local host
mongoose.connect('mongodb://localhost:27017/ToDo2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static( 'ui-dist'));


//Adding app object to the routes
routes(app);

//exporting app object
export default app;
