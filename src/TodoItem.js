import React from "react";

function TodoItem(props) {

  return (
    <li>
      <div className="todo-item">
        <input
          type="checkbox"
          checked={props.completed}
          onChange={ props.handleCheck}
        />
        <p>{props.text}</p>
      </div>
    </li>
  );
}

export default TodoItem;
