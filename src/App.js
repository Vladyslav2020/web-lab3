import React, { useEffect, useState } from 'react';
import TodosListPage from './TodoListPage';
import { StateService } from './StateService';
import { QueryService } from './QueryService';

let queryService = new QueryService();

function App() {
    let [state, setState] = useState({
        todos: [],
        editableTodo: {
            id: null,
            title: null,
            date: null,
            completed: false,
        },
    });

    let stateService = new StateService(state, setState, queryService);

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
                updateTodo={stateService.updateTodo}
                deleteTodo={stateService.deleteTodo}
            />
        </div>
    );
}

export default App;
