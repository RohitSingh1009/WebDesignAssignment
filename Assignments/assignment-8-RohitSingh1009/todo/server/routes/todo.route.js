import express from 'express';
import todoController from './../controllers/todo.controller'
const router = express.Router();

/* GET users listing. */
router.route('/todos') 
.get(todoController.index)
.post(todoController.create);

router.route('/todos/:id')
    .get(todoController.get)
    .put(todoController.update)
    .delete(todoController.remove);

export default router;
