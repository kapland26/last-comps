import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state=({
      input:"",
      list: [],
      editInput: "",
      username: ""
    })
  }

  handleInput(e){
    this.setState({
      input : e
    })
  }
  handleEditInput(e){
    this.setState({
      editInput : e
    })
  }

  handleLogIn(){
    let body={
      username: this.state.input
    }
    axios.post('/api/login', body).then(res => {
      this.setState({
        input: '',
        list: res.data.list,
        username: res.data.name
      })
    }).catch(err => alert(err))
  }

  handleEdit(){
    axios.put(`/api/toDo?newItem=${this.state.editInput}`).then(res => {
    this.setState({
        editInput: '',
        list: res.data.list
      })
    }).catch(err => alert(err))
  }

  render() {
    let tempToDos = this.state.list.map( (val, i) => 
      {
        return <div key={i}> {val}</div>
      }
    )
    return (
      <div className="App">
        Enter username:<br/>
        <input onChange={(e)=>this.handleInput(e.target.value)} value={this.state.input}/>
        <br/><button onClick={()=>this.handleLogIn()}> Login! </button><br/>
        <h1> {this.state.username} </h1>
        <br/><br/>
        {tempToDos}
        <br/>
        Edit first element on list:<br/>
        <input onChange={(e)=>this.handleEditInput(e.target.value)} value={this.state.editInput}/>
        <br/><button onClick={()=>this.handleEdit()}>Edit</button>
      </div>
    );
  }
}

export default App;
