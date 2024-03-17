import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [deletedTodos, setDeletedTodos] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
      document.documentElement.style.setProperty('--new-neon-color', randomColor());
    }, 3000); // Change the color every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    const lastResetDate = new Date(localStorage.getItem('lastResetDate'));

    if (storedTodos) {
      if (!lastResetDate || !isSameDay(lastResetDate, new Date())) {
        setTodos(storedTodos);
      } else {
        const resetTodos = storedTodos.map(todo => ({ ...todo, completed: false }));
        setTodos(resetTodos);
        localStorage.setItem('todos', JSON.stringify(resetTodos));
        localStorage.setItem('lastResetDate', JSON.stringify(new Date()));
      }
    } else {
      setTodos([]);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const lastResetDate = new Date(localStorage.getItem('lastResetDate'));
      if (!isSameDay(lastResetDate, currentDate)) {
        const resetTodos = todos.map(todo => ({ ...todo, completed: false }));
        setTodos(resetTodos);
        localStorage.setItem('todos', JSON.stringify(resetTodos));
        localStorage.setItem('lastResetDate', JSON.stringify(currentDate));
      }
    }, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [todos]);
  

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputText,
        completed: false,
      };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      setInputText('');
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  const handleDeleteTodo = (id) => {
    const deletedTodo = todos.find(todo => todo.id === id);
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    setDeletedTodos([...deletedTodos, deletedTodo]); // Store the deleted todo
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleRefreshTodos = () => {
    const resetTodos = todos.map(todo => ({ ...todo, completed: false }));
    setTodos(resetTodos);
    localStorage.setItem('todos', JSON.stringify(resetTodos));
    localStorage.setItem('lastResetDate', JSON.stringify(new Date()));
  };

  const handleDeleteAllTodos = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const handleUndoDelete = () => {
    if (deletedTodos.length > 0) {
      const lastDeletedTodo = deletedTodos[deletedTodos.length - 1];
      const updatedTodos = [...todos, lastDeletedTodo];
      setTodos(updatedTodos);
      setDeletedTodos(deletedTodos.slice(0, -1)); // Remove the last deleted todo from deletedTodos
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="container">
      <div className="stars">
        <div className="star1"></div>
        <div className="star2"></div>
        <div className="star3"></div>
        <div className="star4"></div>
        <div className="star5"></div>
        <div className="star6"></div>
        <div className="star7"></div>
        <div className="star8"></div>
        <div className="star9"></div>
        <div className="star10"></div>
        <div className="star11"></div>
        <div className="star12"></div>
        <div className="star13"></div>
        <div className="star14"></div>
        <div className="star15"></div>
        <div className="star16"></div>
        <div className="star17"></div>
        <div className="star18"></div>
        <div className="star19"></div>
        <div className="star20"></div>
        <div className="star21"></div>
        <div className="star22"></div>
        <div className="star23"></div>
        <div className="star24"></div>
        <div className="star25"></div>
        <div className="star26"></div>
        <div className="star27"></div>
        <div className="star28"></div>
        <div className="star29"></div>
        <div className="star30"></div>
        <div className="star31"></div>
        <div className="star32"></div>
        <div className="star33"></div>
        <div className="star34"></div>
        <div className="star35"></div>
        <div className="star36"></div>
        <div className="star37"></div>
        <div className="star38"></div>
        <div className="star39"></div>
        <div className="star40"></div>
      </div>
      <h1>Daily Todo List</h1>
      <div className="date">{currentDate}</div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
          placeholder="Enter a new todo..."
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(todo.id)} />
            <span>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
      <div className='btns'>
        <button onClick={handleRefreshTodos} className="refresh-btn">Refresh Todos</button>
        <button onClick={handleUndoDelete} className="undo-btn" disabled={deletedTodos.length === 0}>Undo Delete</button>
        <button onClick={handleDeleteAllTodos} className="delete-all-btn">Delete All Todos</button>
        
      </div>
      <footer className="footer">
        Made with ❤️ by Kiran
      </footer>
    </div>
  );
}

export default App;
