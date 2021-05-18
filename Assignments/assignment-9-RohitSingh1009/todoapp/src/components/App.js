import React from 'react';
import './App.scss';

import Forminput from './Form-element/Forminput';
import TodoList from './Todo-list/Todo-list';
import Detailedview from './Detailed-view/Detailedview'

//This is the parent component

class App extends React.Component  {

  constructor(props){
    super(props);
    this.state={
      items: [],
      selectedItem:undefined

  }
}
   onItemSelect = (selectedTodo)=>{
    this.setState({selectedItem: selectedTodo}) // This will set the state for selected item object so anytime it changes the render method will be called
  }

  onEdit = (key, value) => {
    let selectedItem = this.state.selectedItem;
    selectedItem[key] = value
    this.setState({ selectedItem: selectedItem});
  }

  render(){
    return (
    <div className="container">
      <div className="header">
        <h2>My To do List</h2> 
        {/* Adding Form component */}
        <Forminput></Forminput>
      </div>
      <div className="test">
        {/* Adding Todolist component  */}
        <TodoList onItemSelect={this.onItemSelect}></TodoList>
      </div>
      {/* Adding Detailedview component */}
        {this.state.selectedItem && <Detailedview todoDetails={this.state.selectedItem} onEdit={this.onEdit}></Detailedview>}
    </div>
    
    
    );
  }
}

export default App;
