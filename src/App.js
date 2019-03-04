import React from "react";
import ToDoList from "./ToDoList";
class App extends React.Component {
  state = {
    items: [],
    currentItem: {
      text: "",
      key: "",
      completed: false
    }
  };

  addItem = () => {
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: { text: "", key: "", completed: false }
      });
    }
  }

  handleOnChange = (itemText) => {
    const currentItem = { text: itemText, key: Date.now(), completed: false };
    this.setState({
      currentItem
    });
  }

  handleCheck = (item) => {
   this.setState(({items}) => {
     const index = items.indexOf(item);
     const newItems = [...items];
     newItems[index] = {
        ...item, 
         completed: !item.completed
     }
     return {items: newItems}
   })
  }

  render() {
    return (
      <>
        <ToDoList
          addItem={this.addItem}
          handleOnChange={this.handleOnChange}
          handleCheck={this.handleCheck}
          inputElement={this.inputElement}
          value={this.state.currentItem.text}
          items={this.state.items}
        />
      </>
    );
  }
}

export default App;
