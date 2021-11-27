export class StateService {
    constructor(state, setState, queryService) {
        this.state = state;
        this.setState = setState;
        this.queryService = queryService;
    }

    updateTodos = todos => {
        this.setState(prevState => ({
            ...prevState,
            todos,
        }));
    };

    setEditableTodoId = ({ id, title, completed }) => {
        this.setState(prevState => ({
            ...prevState,
            editableTodo: {
                ...prevState.editableTodo,
                id,
                title,
                completed,
            },
        }));
    };

    setEditableTodoTitle = ({ title }) => {
        this.setState(prevState => ({
            ...prevState,
            editableTodo: {
                ...prevState.editableTodo,
                title,
            },
        }));
    };

    clearEditableTodo = () => {
        this.setState(prevState => ({
            ...prevState,
            editableTodo: {
                id: null,
                title: null,
                date: null,
                completed: false,
            },
        }));
    };

    setEditableTodoCompleted = ({ completed }) => {
        this.setState(prevState => ({
            ...prevState,
            editableTodo: {
                ...prevState.editableTodo,
                completed,
            },
        }));
    };

    downloadTodos = async () => {
        const todos = await this.queryService.fetchTodos();
        this.updateTodos(todos);
    };

    updateTodo = async () => {
        await this.queryService.updateTodo({
            id: this.state.editableTodo.id,
            title: this.state.editableTodo.title,
            completed: this.state.editableTodo.completed,
        });
        await this.downloadTodos();
        this.clearEditableTodo();
    };

    deleteTodo = async ({ id }) => {
        await this.queryService.deleteTodo({ id });
        await this.downloadTodos();
        this.clearEditableTodo();
    };
}
