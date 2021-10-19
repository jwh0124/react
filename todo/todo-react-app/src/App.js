import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';
import React from 'react';
import Todo from './Todo';
import { Container, List, Paper } from '@material-ui/core';
import AddTodo from './AddTodo';
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({items: response.data})
    );
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({items: response.data})
    );
  }

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({items: response.data})
    );
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({items: response.data})
    );
  }

  render(){
    var todoItems = this.state.items.length > 0 && (
      <Paper stype={{margin:16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} update={this.update} delete={this.delete}/>
          ))}
        </List>
      </Paper>
    );
    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className="TodoList">{todoItems}</div>  
        </Container>
      </div>
    );
  }
}

export default App;
