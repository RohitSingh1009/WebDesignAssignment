import Todo from './../models/todo';
// This function will retrieve all the todos stored in the database and return an promise
const search = (filter) => {
    const promise = Todo.find(filter).exec();
    return promise;
}

//This function will create a new todo in the database
const create =(newTodo) =>{
    const todo =new Todo(newTodo);
    const promise =todo.save();
    return promise;
}
// This function will retrieve single todo object based on the id
const get =(id) =>{
    const promise = Todo.findById(id).exec();
    return promise;
}
// This function will update the todo object based on the id
const update = (id, body) =>{
    const promise =Todo.findByIdAndUpdate(
        {_id:id},
        body,{new:true}
        ).exec();
    return promise;
}
// This function will remove the single todo object based on the id
const remove =(id) =>{
    const promise =Todo.remove({_id: id}).exec();
    return promise;
}

export default{
    search:search,
    create:create,
    get:get,
    update:update,
    remove:remove
}