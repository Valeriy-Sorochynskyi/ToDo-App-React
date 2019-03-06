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
    checkedAll: false,
    sortBy: ""
  };

  toggleItem = id => {
    this.setState(({ items }) => {
      const newItems = items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done
          };
        }
        return item;
      });

      return {
        items: newItems
      };
    });
  };

  changeText = (id, text) => {
    this.setState(({ items }) => {
      const newItems = items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            text
          };
        }
        return item;
      });

      return {
        items: newItems
      };
    });
  };

  handleDelete = id => {
    this.setState(({ items }) => {
      return {
        items: items.filter(current => current.id !== id)
      };
    });
  };

  addItem = text => {
    if (text === "") {
      return;
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

  handleOnAll = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        sortBy: "all"
      };
    });
  };

  handleOnActive = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        sortBy: "active"
      };
    });
  };

  handleOnCompleted = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        sortBy: "done"
      };
    });
  };

  filterItems = ({ items, sortBy }) => {
    switch (sortBy) {
      case "all":
        return items;
      case "done":
        return items.filter(item => item.done);
      case "active":
        return items.filter(item => !item.done);
      default:
        return items;
    }
  };

  render() {
    const activeItems = this.state.items.filter(item => !item.done);
    const items = this.filterItems(this.state);
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
            {items.map(item => (
              <ToDo
                key={item.id}
                id={item.id}
                text={item.text}
                done={item.done}
                onChange={() => this.toggleItem(item.id)}
                onDelete={() => this.handleDelete(item.id)}
                onTextChanged={text => this.changeText(item.id, text)}
              />
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{activeItems.length}</strong> item left
          </span>
          <Filters
            onAll={this.handleOnAll}
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

const Filters = ({ onAll, onActive, onCompleted }) => {
  return (
    <ul className="filters">
      <li>
        <a onClick={onAll} href="#/" className="selected">
          All
        </a>
      </li>
      <li>
        <a onClick={onActive} href="#/active" className="selected">
          Active
        </a>
      </li>
      <li>
        <a onClick={onCompleted} href="#/completed" className="selected">
          Completed
        </a>
      </li>
    </ul>
  );
};

const App = () => (
  <div className="App">
    <ToDoList />
  </div>
);

export default App;
