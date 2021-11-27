import React, { useEffect, useState } from 'react';
import TodosListPage from './TodoListPage';
import { StateService } from './StateService';
import { QueryService } from './QueryService';
import Loader from './Loader';

let queryService;

function App() {
    const [loading, setLoading] = useState(false);
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

    queryService = new QueryService(showLoader, hideLoader);

    const stateService = new StateService(state, setState, queryService);

    useEffect(() => {
        stateService.downloadTodos();
    }, []);
    return (
        <div className="App">
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
