import React, { useState } from 'react';

const AddTodoItem = ({ addNewTodo }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [todoTitle, setTodoTitle] = useState('');

    const submitHandler = async event => {
        event.preventDefault();
        setButtonDisabled(true);
        if (todoTitle) {
            addNewTodo({ title: todoTitle });
            setTodoTitle('');
        }
        setButtonDisabled(false);
    };
    return (
        <React.Fragment>
            <div className="container text-center my-3 ">
                <h3>Add new Todo</h3>
            </div>
            <form className="container" onSubmit={submitHandler}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="add"
                        id="add"
                        placeholder="What needs to be done?"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={todoTitle}
                        required
                        onChange={event => setTodoTitle(event.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        type="button"
                        id="button"
                        disabled={buttonDisabled || !todoTitle}
                        onClick={submitHandler}
                    >
                        Add todo
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default AddTodoItem;
