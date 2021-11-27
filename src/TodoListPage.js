import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoItem from './AddTodoItem';

const TodosListPage = ({
    todos,
    editableTodo,
    setEditableTodoId,
    setEditableTodoTitle,
    setEditableTodoCompleted,
    clearEditableTodo,
    addNewTodo,
    updateTodo,
    deleteTodo,
}) => {
    const [tab, setTab] = useState('all');
    const tabsDisplay = todos.length !== 0 ? '' : 'none';
    return (
        <div className="container mt-3">
            <div className="container">
                <AddTodoItem addNewTodo={addNewTodo} />
            </div>
            <div className="container">
                <div className="container text-center my-3 ">
                    <h3 style={{ color: '#0d6efd' }}>Todo list</h3>
                </div>
                <ul
                    style={{ display: tabsDisplay }}
                    className="nav nav-tabs mb-3"
                >
                    <li className="nav-item" onClick={() => setTab('all')}>
                        <a
                            className={
                                tab === 'all' ? 'nav-link active' : 'nav-link'
                            }
                            aria-current="page"
                        >
                            All
                        </a>
                    </li>
                    <li className="nav-item" onClick={() => setTab('active')}>
                        <a
                            className={
                                tab === 'active'
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                        >
                            Active
                        </a>
                    </li>
                    <li
                        className="nav-item"
                        onClick={() => setTab('completed')}
                    >
                        <a
                            className={
                                tab === 'completed'
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                        >
                            Completed
                        </a>
                    </li>
                </ul>
                <TodoList
                    todos={todos}
                    editableTodo={editableTodo}
                    filter={tab}
                    setEditableTodoId={setEditableTodoId}
                    setEditableTodoTitle={setEditableTodoTitle}
                    setEditableTodoCompleted={setEditableTodoCompleted}
                    clearEditableTodo={clearEditableTodo}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    );
};

export default TodosListPage;
