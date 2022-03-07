let todoListItems = [];

class ToDoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      style: {fontWeight: "bold"},
      deleted: false,
    };
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem(event) {
    let style = {textDecoration: "line-through", color: "red"};
    Object.assign(document.getElementById("btnDeleteItem" + this.state.content).style, {visibility: "hidden"});
    this.setState({
      content: this.props.content,
      style: style,
    });
    this.doCounter();
  }
  render() {
    return (
      <div>
        <li key={this.state.content} style={this.state.style}>{this.state.content}<button id={"btnDeleteItem" + this.state.content} onClick={this.deleteItem}>Done</button></li>
      </div>
    );
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      items: [],
      counter: 0
    };
    this.doChange = this.doChange.bind(this);
    this.doClick = this.doClick.bind(this);
  }
  doChange(event) {
    this.setState({
      input: event.target.value,
      items: this.state.items,
      counter: this.state.counter
    })
  }
  doClick(event) {
    let item = this.state.input;
    let count = this.state.counter;
    if (item != '') {
      let items = [...this.state.items, item];
      this.setState({
        input: '',
        items: items,
        counter: count + 1
      });
    }
  }
  render() {
    // render all the ToDoList Items
    let todoList = [...this.state.items].map((item) => <ToDoListItem content={item} counter={this.state.counter} doCounter={this.doCounter}/>);
    let divStyle = {
      backgroundColor: "black",
      width: "100vw",
      height: "100vh",
      color: "blue",
      textAlign: "center"
    };
    let headerStyle = {
      color: "yellow",
      textDecoration: "underline",
    };
    let secondHeaderStyle = {
      color: "blue"
    };
    let filtered_list = todoList.filter((item) => {
      return !item.deleted;
    });
    return (
      <div style={divStyle}>
        <h1 style={headerStyle}>TO-DO LIST</h1>
        <input
          type={"text"}
          value={this.state.input}
          onChange={this.doChange}
          placeholder="Enter a todo list item">
        </input>
        <button id={"btnAddItem"} onClick={this.doClick}>
          Add Item
        </button>
        {todoList}
      </div>
    );
  }
}


ReactDOM.render(<ToDoList />, document.getElementById("root"));