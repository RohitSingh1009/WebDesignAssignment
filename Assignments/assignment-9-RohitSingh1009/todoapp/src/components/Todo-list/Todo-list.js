import React from 'react';

import './TodoList.scss'

class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            items :[],
            isLoaded:false,
            id:undefined,
        }
    }


    refreshPage() {
        window.location.reload(false);
      }

    componentDidMount(){ 
        fetch('http://localhost:4000/todos2')  // This function is to get all the items from the server.
        .then(res => res.json())
        .then(json =>{
            const items = json.map((item) => {
                let dueDate = item.dueDate.split('T')[0];
                // let month = dueDate.getMonth() + 1;
                // let mm = month > 9 ? month : `0${month}`;
                // let date = dueDate.getDate();
                // let dd = date > 9 ? date : `0${date}`;
                item.dueDate = dueDate
                return item;
            })
            this.setState(
                {
                    isLoaded: true,
                    items:json,
                }
            )
        });

    }

    onItemClick(event){
       const item =this.state.items[event];
       this.props.onItemSelect(item);   //sending the props to app.js
      
    }

    
    
  
    onSpanCheckItemClick(event){
        const item =this.state.items[event];
        item.isCompleted =!item.isCompleted;
        const id=item._id;
        let url =`http://localhost:4000/todos2/`;
        fetch(url+id,                             // Using fetchAPI updating the request with the id
            { 
                method :'PUT',                      // The put method will update the request
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'  
                    },
                    body:JSON.stringify(item)
            }) 
            .then((result) =>{
                result.json()                          //converting the response to json
                .then((resp)=>{
                    console.warn("resp",resp)
                })
            });
            this.refreshPage();
    }



  

    onSpanItemClick(event){
      const item =this.state.items[event];
       const id =item.id
        console.log('id:',id);
        let url =`http://localhost:4000/todos2/`; // This function is to delete a single todo List item using id
        console.log(url+id);
        fetch(url+id, 
        { 
            method :'DELETE',    // The delete functionality in fetchApi method is used to delete it in backend
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                
              }
        }) 
        .then((result) =>{
            result.json()
            .then((resp)=>{
                console.warn("resp",resp)
            })
        });
        this.refreshPage();
        
    }


    render()
    {
    
        let {isLoaded,items} =this.state;
        console.log(items);
    
        const todoList= items.map((item,index)=> <li><span  onClick={this.onItemClick.bind(this,index)} key={index} className ={item.isCompleted ? 'strike' :''}>{item.title}</span><span className="checkButton" onClick={this.onSpanCheckItemClick.bind(this,index)}>Done</span><span className="crossButton" onClick={this.onSpanItemClick.bind(this,index)}>X</span></li>); //Using the array map function to extract the title attribute
      
        
        return(
            <div className ="myTest">
                <ul>
                    {todoList}
                </ul>
            </div>
    
        );

    }

}

export default TodoList;