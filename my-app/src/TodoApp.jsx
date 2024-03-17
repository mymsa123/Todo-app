import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TodoInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TodoList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TodoItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;

  input[type='text'] {
    flex: 1;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px;
  }

  button {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const deleteTodo = index => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const editTodo = index => {
    setEditingIndex(index);
    setEditedValue(todos[index]);
  };

  const updateTodo = () => {
    if (editedValue.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = editedValue;
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditedValue('');
    }
  };

  return (
    <Container>
      <h1>Todo App</h1>
      <TodoInput
        type="text"
        placeholder="Enter todo..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <TodoList>
        {todos.map((todo, index) => (
          <TodoItem key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedValue}
                  onChange={e => setEditedValue(e.target.value)}
                />
                <button onClick={updateTodo}>Update</button>
              </>
            ) : (
              <>
                {todo}
                <div>
                  <button onClick={() => editTodo(index)}>Edit</button>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
              </>
            )}
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
};

export default TodoApp;





