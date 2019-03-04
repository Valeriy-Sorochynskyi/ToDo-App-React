import React from "react";
import TodoItem from "./TodoItem";

const ToDoList = ({ addItem, handleOnChange, value, inputElement, items, handleCheck }) => {
  return (
    <div className="todo-list">
      <h1>ToDo List</h1>
      <div className="todo-list-header">
        {items.length ? <p>{items.length} items left</p> : ""}
        <input
          type="text"
          placeholder="Enter your tasks..."
          onChange={event => handleOnChange(event.target.value)}
          ref={inputElement}
          value={value}
        />
        <button onClick={() => addItem()}>Add</button>
      </div>
      <ul>
        {items.map(item => (
          <TodoItem
            key={item.key}
            text={item.text}
            completed={item.completed}
            handleCheck={() => handleCheck(item)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
