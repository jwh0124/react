import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';
import React from 'react';
import Todo from './Todo';
import { List, Paper, Container, Grid, Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService';
import LoadingPage from './LoadingPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true
    };
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({items: response.data, loading:false})
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

    var navigarionBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="flex-start" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
          </Grid>
          <Grid>
            <Button color="inherit" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    )

    var todoListPage = (
      <div>
        {navigarionBar}
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className="TodoList">{todoItems}</div>  
        </Container>
      </div>
    )

    var content = <LoadingPage/>;
    if(!this.state.loading){
      content = todoListPage;
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
