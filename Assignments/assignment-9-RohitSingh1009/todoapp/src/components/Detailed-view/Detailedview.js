import React from 'react';

import './Detailedview.scss';

class Detailedview extends React.Component{
    constructor(props){
        super(props);
        
    }

    changeHadler=(e)=>{
        this.props.onEdit(e.target.name, e.target.value);
    }

    refreshPage() {
        window.location.reload(false);
      }
    onUpdate = () => {
        const {todoDetails} = this.props;
        const {_id } = todoDetails;
        let url ='http://localhost:4000/todos2/'; //Taking the url
        fetch(url+_id,                             // Using fetchAPI updating the request with the id
            { 
                method :'PUT',                      // The put method will update the request
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'  
                    },
                    body:JSON.stringify(todoDetails)
            }) 
            .then((result) =>{
                result.json()                          //converting the response to json
                .then((resp)=>{
                    console.warn("resp",resp)
                })
            });
            this.refreshPage();
    }

    render(){
        const {todoDetails} = this.props;
        console.log(todoDetails.dueDate)
        return (
            <div className="detailedView">
                <h1> Detailed View</h1>
                <input id="myInput" className="input" type="text" name ="title" onChange={this.changeHadler} required  value={todoDetails ? todoDetails.title: '' }  ></input><br/> 
                <input className="input" type="text" name ="description" onChange={this.changeHadler} value={todoDetails ? todoDetails.description: ''}></input><br/>
                <input className="input" type="date" name ="dueDate" onChange={this.changeHadler} value={todoDetails ? todoDetails.dueDate: ''}></input><br/>
                <input className="input" type="time" name ="time" onChange={this.changeHadler} value={todoDetails ? todoDetails.time: ''}></input><br/> 
                <button type="submit" className="addBtn1" onClick={this.onUpdate}>Update</button>   
            </div>
        )
    }
    
}

export default Detailedview;