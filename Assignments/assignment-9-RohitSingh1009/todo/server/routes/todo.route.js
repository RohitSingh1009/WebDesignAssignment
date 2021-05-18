import express from 'express';
import todoController from './../controllers/todo.controller'
const router = express.Router();



/* GET users listing. */
router.route('/todos2') 
.get(todoController.index)
.post(todoController.create);

router.route('/todos2/:id')
    .get(todoController.get)
    .put(todoController.update)
    .delete(todoController.remove);

router.route('/*') 
.get(todoController.resource)

export default router;
