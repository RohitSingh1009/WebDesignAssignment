import React from 'react';


import './Forminput.scss';

class Forminput extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title: '',
            description: '',
            dueDate:'',
            time:''
        }

    }
    refreshPage() {
        window.location.reload(false);
      }


    
    clickHandler(event){
        const inputName = document.getElementById('myInput').value;
        if (inputName === '') {   // If nothing is inputted, adding an alert
            alert("Please enter the required field");
        } 
        else{
            event.preventDefault();
                let url ='http://localhost:4000/todos2'
                let data=this.state;  
                // const title =document.getElementById('myInput').value;
                // this.props.add(title);
                fetch(url,{                         //Using fetchapi posting the request 
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json",
                        "Accept": "application/json"
                    },
                    body:JSON.stringify(data)
                })
                .then((result) =>{
                    result.json()
                    .then((resp)=>{
                        console.warn("resp",resp)
                    })
                });
                this.refreshPage();
        }
    }

    changeHandler=(e)=>{
        this.setState({[e.target.name]: e.target.value}); //Setting the state on the change handle event
    }


    render()
    {
        const{title,description,duedate,time} =this.state; //Taking all the value variable in the state for the input tag
        return(
            <div className="inputContainer">
                <input type="text" id="myInput" placeholder="Title... *" name="title"  value={title} onChange={this.changeHandler} required />
                <input type="textArea" id="DescriptionInput" placeholder="Description... " name="description" value={description} onChange={this.changeHandler} required />
                <input type="date" id="DateInput" placeholder="Date..." name="dueDate" value={duedate} onChange={this.changeHandler} />
                <input type="time" id="TimeInput" placeholder="Time..." name= "time" value={time}  onChange={this.changeHandler}/>
                {/* <span onClick={()=>{this.submit()}} className="addBtn">Add</span> */}
                <button type="submit" onClick={this.clickHandler.bind(this)} className="addBtn">Add</button>  
            </div>
        );

    }

}

export default Forminput;