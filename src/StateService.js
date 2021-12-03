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

    addTodo = async ({ title }) => {
        const newTodo = await this.queryService.addTodo({ title });
        if (newTodo) {
            await this.downloadTodos();
        }
    };

    downloadTodos = async () => {
        const todos = await this.queryService.fetchTodos();
        if (todos) {
            this.updateTodos(todos);
        }
    };

    updateTodo = async () => {
        const updatedTodo = await this.queryService.updateTodo({
            ...this.state.editableTodo,
        });
        if (updatedTodo) {
            await this.downloadTodos();
            this.clearEditableTodo();
        }
    };

    deleteTodo = async ({ id }) => {
        const todo = await this.queryService.deleteTodo({ id });
        if (todo) {
            await this.downloadTodos();
            this.clearEditableTodo();
        }
    };
}
