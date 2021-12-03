import React, { useEffect, useState } from 'react';
import TodosListPage from './TodoListPage';
import { StateService } from './StateService';
import { QueryService } from './QueryService';
import Loader from './Loader';
import Message from './Message';

function App() {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState({ message: '', type: '' });
    const [state, setState] = useState({
        todos: [],
        editableTodo: {
            id: null,
            title: null,
            date: null,
            completed: false,
        },
    });

    const showLoader = () => {
        setLoading(true);
    };

    const hideLoader = () => {
        setLoading(false);
    };

    const showMessage = ({ type, message }) => {
        setReport({ type, message });
    };

    const hideMessage = () => {
        setReport({ message: '', type: '' });
    };

    const queryService = new QueryService(
        showLoader,
        hideLoader,
        showMessage,
        hideMessage,
    );

    const stateService = new StateService(state, setState, queryService);

    useEffect(() => {
        stateService.downloadTodos();
    }, []);
    return (
        <div className="App">
            <Message
                type={report.type}
                message={report.message}
                hideMessage={hideMessage}
            />
            <TodosListPage
                todos={state.todos}
                editableTodo={state.editableTodo}
                setEditableTodoId={stateService.setEditableTodoId}
                setEditableTodoTitle={stateService.setEditableTodoTitle}
                setEditableTodoCompleted={stateService.setEditableTodoCompleted}
                clearEditableTodo={stateService.clearEditableTodo}
                addNewTodo={stateService.addTodo}
                updateTodo={stateService.updateTodo}
                deleteTodo={stateService.deleteTodo}
            />
            {loading && <Loader />}
        </div>
    );
}

export default App;
