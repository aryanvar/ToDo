import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoApp.css';


const API_URL = 'http://localhost:8080/api/todos';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(API_URL);
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setError('Failed to fetch todos. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    const createTodo = async (e) => {
        if (e) e.preventDefault();
        if (!newTodo.trim()) {
            setError('Todo title cannot be empty');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post(API_URL, {
                title: newTodo.trim(),
                completed: false
            });
            setTodos([response.data, ...todos]);
            setNewTodo('');
        } catch (error) {
            console.error('Error creating todo:', error);
            if (error.response?.data?.errors) {
                setError(Object.values(error.response.data.errors).join(', '));
            } else {
                setError('Failed to create todo');
            }
        } finally {
            setLoading(false);
        }
    };

    const updateTodo = async (id, updatedTodo) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
            setTodos(todos.map(todo =>
                todo.id === id ? response.data : todo
            ));
            setEditingId(null);
            setEditingTitle('');
        } catch (error) {
            console.error('Error updating todo:', error);
            if (error.response?.data?.errors) {
                setError(Object.values(error.response.data.errors).join(', '));
            } else {
                setError('Failed to update todo');
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (id) => {
        if (!window.confirm('Are you sure you want to delete this todo?')) {
            return;
        }
        setLoading(true);
        setError('');
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
            setError('Failed to delete todo');
        } finally {
            setLoading(false);
        }
    };

    const toggleComplete = (id) => {
        const todo = todos.find(t => t.id === id);
        updateTodo(id, { ...todo, completed: !todo.completed });
    };

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditingTitle(todo.title);
        setError('');
    };

    const saveEdit = (id) => {
        if (!editingTitle.trim()) {
            setError('Todo title cannot be empty');
            return;
        }
        const todo = todos.find(t => t.id === id);
        updateTodo(id, { ...todo, title: editingTitle.trim() });
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'pending') return !todo.completed;
        return true;
    });

    const totalCount = todos.length;
    const completedCount = todos.filter(t => t.completed).length;
    const pendingCount = totalCount - completedCount;


    return (
        <div className="todo-app">
            <div className="todo-container">
                {/* Header */}
                <header className="todo-header">
                    <h1>Todo App</h1>
                    <p>Stay organized and productive</p>
                </header>

                {/* Error Message */}
                {error && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        <span className="error-text">{error}</span>
                        <button onClick={() => setError('')} className="error-close">×</button>
                    </div>
                )}

                {/* Loading Indicator */}
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <span>Processing...</span>
                        </div>
                    </div>
                )}

                {/* Add Todo Form */}
                <div className="add-todo-section">
                    <div className="add-todo-form">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="What needs to be done?"
                            className="todo-input"
                            disabled={loading}
                            maxLength={255}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    createTodo(e);
                                }
                            }}
                        />
                        <button
                            onClick={createTodo}
                            disabled={loading || !newTodo.trim()}
                            className="add-btn"
                        >
                            <span className="btn-icon">+</span>
                            Add
                        </button>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="filter-section">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All ({totalCount})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        Active ({pendingCount})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed ({completedCount})
                    </button>
                </div>

                {/* Todo List */}
                <div className="todo-list">
                    {filteredTodos.map(todo => (
                        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            {editingId === todo.id ? (
                                <div className="edit-mode">
                                    <input
                                        type="text"
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        className="edit-input"
                                        maxLength={255}
                                        disabled={loading}
                                        autoFocus
                                    />
                                    <div className="edit-actions">
                                        <button
                                            onClick={() => saveEdit(todo.id)}
                                            disabled={loading}
                                            className="save-btn"
                                        >
                                            ✓
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingId(null);
                                                setError('');
                                            }}
                                            disabled={loading}
                                            className="cancel-btn"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="view-mode">
                                    <div className="todo-content">
                                        <button
                                            onClick={() => toggleComplete(todo.id)}
                                            className={`check-btn ${todo.completed ? 'checked' : ''}`}
                                            title="Click to toggle completion"
                                        >
                                            {todo.completed ? '✓' : ''}
                                        </button>

                                        <div className="todo-details">
                                            <span className="todo-title">{todo.title}</span>
                                            {todo.createdAt && (
                                                <div className="todo-meta">
                                                    <small>
                                                        Created: {new Date(todo.createdAt).toLocaleDateString()}
                                                        {todo.updatedAt !== todo.createdAt && (
                                                            <span> • Updated: {new Date(todo.updatedAt).toLocaleDateString()}</span>
                                                        )}
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="todo-actions">
                                        <button
                                            onClick={() => startEdit(todo)}
                                            disabled={loading}
                                            className="edit-btn"
                                            title="Edit todo"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            disabled={loading}
                                            className="delete-btn"
                                            title="Delete todo"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTodos.length === 0 && !loading && (
                    <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <h3>
                            {filter === 'all' ? 'No todos yet' : `No ${filter} todos`}
                        </h3>
                        <p>
                            {filter === 'all'
                                ? "Add your first todo above to get started!"
                                : `You don't have any ${filter} todos right now.`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoApp
