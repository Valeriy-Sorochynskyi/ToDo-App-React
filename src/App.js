import React from "react";
import "./App.css";

class ToDo extends React.Component {
  state = {
    isEditing: false,
    currentValue: ""
  };

  startEditing = () => {
    this.setState({
      isEditing: true,
      currentValue: this.props.text
    });
  };

  handleTextChange = event => {
    if (event.key !== "Enter") {
      return;
    }

    this.props.onTextChanged(this.state.currentValue);

    this.setState({
      currentValue: "",
      isEditing: false
    });
  };

  render() {
    const { id, done, text, onChange, onDelete } = this.props;
    const classes = [];
    if (done) {
      classes.push("completed");
    }

    if (this.state.isEditing) {
      classes.push("editing");
    }

    return (
      <li onDoubleClick={this.startEditing} className={classes.join(" ")}>
        <div className="view">
          <input
            id={`todo-${id}`}
            className="toggle"
            type="checkbox"
            checked={done}
            onChange={onChange}
          />
          <label htmlFor={`todo-${id}`}>{text}</label>
          <button className="destroy" onClick={onDelete} />
        </div>

        {this.state.isEditing && (
          <input
            onKeyPress={this.handleTextChange}
            value={this.state.currentValue}
            onChange={event =>
              this.setState({ currentValue: event.target.value })
            }
            type="text"
            className="edit"
          />
        )}
      </li>
    );
  }
}

class ToDoList extends React.Component {
  state = {
    items: [],
    newItemText: "",
    checkedAll: false
  };

  toggleItem = item => {
    this.setState(({ items }) => {
      const index = items.indexOf(item);
      const newItems = [...items];

      newItems[index] = {
        ...item,
        done: !item.done
      };

      return {
        items: newItems
      };
    });
  };

  changeText = (item, text) => {
    this.setState(({ items }) => {
      const index = items.indexOf(item);
      const newItems = [...items];
      newItems[index] = {
        ...item,
        text
      };

      return {
        items: newItems
      };
    });
  };

  handleDelete = item => {
    this.setState(({ items }) => {
      return {
        items: items.filter(current => current !== item)
      };
    });
  };

  addItem = text => {
    if (text===""){
      return
    }
    this.setState(({ items }) => {
      const newItem = {
        id: `${+new Date()}`,
        done: false,
        text
      };

      return {
        items: [...items, newItem],
        newItemText: ""
      };
    });
  };

  handleItemAdd = event => {
    event.preventDefault();

    this.addItem(this.state.newItemText);
  };

  handleNewItemTextChange = event => {
    this.setState({
      newItemText: event.target.value
    });
  };

  clearCompleted = () => {
    this.setState(({ items }) => {
      return {
        items: items.filter(item => !item.done)
      };
    });
  };

  checkAll = () => {
    this.setState(({ items, checkedAll }) => {
      const newItems = [...items];
      newItems.forEach(item => {
        this.state.checkedAll ? (item.done = false) : (item.done = true);
      });
      return {
        items: newItems,
        checkedAll: !checkedAll
      };
    });
  };

  handleOnActive = () => {
    this.setState(({items}) => {
      return {
        items: items.filter(item => !item.done)
      }
    })
  }

  handleOnCompleted = () => {
    this.setState(({items, completedItems}) => {
      return {
        items: items.filter(item => item.done)
      }
    })
  }

  render() {
    const activeItems = this.state.items.filter(item => !item.done);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleItemAdd}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus=""
              value={this.state.newItemText}
              onChange={this.handleNewItemTextChange}
            />
          </form>
        </header>

        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.checkAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {this.state.items.map(item => (
              <ToDo
                key={item.id}
                id={item.id}
                text={item.text}
                done={item.done}
                onChange={() => this.toggleItem(item)}
                onDelete={() => this.handleDelete(item)}
                onTextChanged={text => this.changeText(item, text)}
              />
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{activeItems.length}</strong> item left
          </span>
              <Filters 
              onActive={this.handleOnActive} 
              onCompleted={this.handleOnCompleted}
              />
          <button onClick={this.clearCompleted} className="clear-completed">
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

class Filters extends React.Component {
  state = {
    isSelected: false
  }
  render() {
    return (
      <ul className="filters">
        <li>
          <a href="#/" className="selected">
            All
          </a>
        </li>
        <li>
          <a onClick={this.props.onActive} href="#/active">Active</a>
        </li>
        <li>
          <a onClick={this.props.onCompleted} href="#/completed">Completed</a>
        </li>
      </ul>
    );
  }
}

const App = () => (
  <div className="App">
    <ToDoList />
  </div>
);

export default App;
