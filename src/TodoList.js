import React from 'react';

const TodoList = ({
    todos,
    editableTodo,
    filter,
    setEditableTodoId,
    setEditableTodoTitle,
    setEditableTodoCompleted,
    clearEditableTodo,
    updateTodo,
    deleteTodo,
}) => {
    const submitHandler = event => {
        event.preventDefault();
        updateTodo();
    };
    if (todos.length === 0) return <p className="ps-3">No todos</p>;
    const styleDisable = { paddingTop: '12px' };
    let TodoItems = todos
        .filter(item => {
            if (filter === 'all') return true;
            if (filter === 'completed' && item.completed) return true;
            if (filter === 'active' && !item.completed) return true;
            return false;
        })
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((item, index) => (
            <tr className="d-flex" key={item.id}>
                <th
                    className="d-flex align-items-center"
                    scope="row"
                    style={{ ...styleDisable, width: '50px' }}
                >
                    {index + 1}
                </th>
                <td
                    className="d-flex align-items-center"
                    style={
                        item.id !== editableTodo.id
                            ? {
                                  ...styleDisable,
                                  width: 'calc(100% - 530px)',
                              }
                            : { width: 'calc(100% - 530px)' }
                    }
                >
                    {item.id !== editableTodo.id ? (
                        <div>{item.title}</div>
                    ) : (
                        <form onSubmit={submitHandler}>
                            <input
                                className="form-control"
                                value={editableTodo.title}
                                style={{
                                    paddingTop: '3px',
                                    paddingBottom: '3px',
                                }}
                                onChange={event =>
                                    setEditableTodoTitle({
                                        title: event.target.value,
                                    })
                                }
                            />
                        </form>
                    )}
                </td>
                <td
                    className="d-flex align-items-center"
                    style={{ ...styleDisable, width: '200px' }}
                >
                    {new Date(item.date).toLocaleString()}
                </td>
                <td
                    className="d-flex align-items-center"
                    style={{ ...styleDisable, width: '150px' }}
                >
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            disabled={item.id !== editableTodo.id}
                            type="checkbox"
                            id={item.id}
                            checked={
                                item.id !== editableTodo.id
                                    ? item.completed
                                    : editableTodo.completed
                            }
                            onChange={event =>
                                setEditableTodoCompleted({
                                    completed: event.target.checked,
                                })
                            }
                        />
                        <label className="form-check-label" htmlFor={item.id}>
                            Completed
                        </label>
                    </div>
                </td>
                <td
                    className="d-flex align-items-center"
                    style={{ width: '130px' }}
                >
                    <ul className="list-inline m-0">
                        <li className="list-inline-item">
                            <button
                                className="btn btn-primary btn-sm rounded-0"
                                type="submit"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Save"
                                disabled={item.id !== editableTodo.id}
                                onClick={submitHandler}
                            >
                                <i className="fa fa-table"></i>
                            </button>
                        </li>
                        <li className="list-inline-item">
                            <button
                                className="btn btn-success btn-sm rounded-0"
                                type="button"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                                onClick={() =>
                                    editableTodo.id !== item.id
                                        ? setEditableTodoId({
                                              id: item.id,
                                              title: item.title,
                                              completed: item.completed,
                                          })
                                        : clearEditableTodo()
                                }
                            >
                                <i className="fa fa-edit"></i>
                            </button>
                        </li>
                        <li className="list-inline-item">
                            <button
                                className="btn btn-danger btn-sm rounded-0"
                                type="button"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                                onClick={() => deleteTodo({ id: item.id })}
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </li>
                    </ul>
                </td>
            </tr>
        ));
    if (!TodoItems.length)
        TodoItems = (
            <tr>
                <td style={{ border: 'none' }}>
                    <p className="ps-3 mt-3">Empty</p>
                </td>
            </tr>
        );
    return (
        <table className="table">
            <thead>
                <tr className="d-flex" key={0}>
                    <th scope="col" style={{ width: '50px' }}>
                        #
                    </th>
                    <th scope="col" style={{ width: 'calc(100% - 530px)' }}>
                        Todo
                    </th>
                    <th scope="col" style={{ width: '200px' }}>
                        Date
                    </th>
                    <th scope="col" style={{ width: '150px' }}>
                        Completed
                    </th>
                    <th scope="col" style={{ width: '130px' }}>
                        buttons
                    </th>
                </tr>
            </thead>
            <tbody>{TodoItems}</tbody>
        </table>
    );
};

export default TodoList;
