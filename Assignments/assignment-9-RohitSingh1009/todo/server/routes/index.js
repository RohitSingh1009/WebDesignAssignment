import todoRouter from './todo.route';

//Using the middleware app.use for routing the imported router from todo.routes.js
export default(app) =>{
  app.use('/',todoRouter);
}


