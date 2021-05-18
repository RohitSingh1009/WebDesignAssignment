
import todoService from './../services/todo.service';
import toDoService from './../services/todo.service';


// This controller is to call the function search in the service layer and this function returns promise and according to that response status and json are set
const index = (request, response) => {
    const promise = toDoService.search();
    promise.then((todos) =>{
        response.status(200);
        response.json(todos);
    })
    .catch(handleError(response));
}
//This controller is to call the function create in the service layer and this function returns promise and according to that response status and json response is set to todo
const create = (request, response) => {
 
    const todo = {...request.body};
    todo.lastModifiedDate =Date.now();
    todo.createdDate =Date.now();
    console.log(request);

    const promise = toDoService.create(todo); // calls the create function in service module and this returns an promise object.
   
    promise.then((newTodo) =>{
       
        response.status(200); // response status 200 is set if the request is successful.
        response.json(newTodo);
    })
    .catch(handleError(response));
}



const get =(request, response)=>{
    const id =request.params.id;
    const promise = toDoService.get(id);// calls the get function by passing the id param to the service module for function get and the return is an promise object
    promise.then((todo) =>{
        response.status(200);// response status 200 is set if the request is successful.
        response.json(todo);
    })
    .catch(handleError(response));
};


const update =(request, response)=>{
    const id =request.params.id;
    //const body ={...request.body};

    let body=  Object.assign({}, request.body);
    body.lastModifiedDate =Date.now();
    const promise =todoService.update(id,body);//calls the update function by passing the id  and the body as param  to the service module for function update and the return is an promise object
    promise.then((todo)=>{
        response.status(200); // response status 200 is set if the request is successful.
        response.json(todo);
    })
    .catch(handleError(response));
    };



const remove =(request, response)=>{
    const id =request.params.id;
    const promise =todoService.remove(id); // Call the remove function in the service module with passing the id retrieved from the request object and then stores the return type promise object
    promise.then((todo)=>{
        response.status(200); // response status 200 is set if the request is successful.
        response.json({
            message:"Delete successful"
        });
       })
       .catch(handleError(response));
};


const handleError = (response) => {
    return (error) => {
        response.status(500);
        response.json({
            message: error.message
        })
    };
}



export default{
    index:index,
    create:create,
    get:get,
    update:update,
    remove:remove
}