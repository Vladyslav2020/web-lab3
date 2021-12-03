import { Config } from './Config';

export class QueryService {
    static downloadQuery = `
      query DownloadTodos {
        todos(order_by: {}) {
          id
          title
          date
          completed
        }
      }
    `;

    constructor(showLoader, hideLoader, showMessage, hideMessage) {
        this.showLoader = showLoader;
        this.hideLoader = hideLoader;
        this.showMessage = showMessage;
        this.hideMessage = hideMessage;
    }

    async fetchTodos() {
        const { errors, data } = await this.processQuery(
            QueryService.downloadQuery,
            'DownloadTodos',
        );
        if (errors || !data) {
            this.showMessage({
                message: 'Failed to fetch todos.',
                type: 'danger',
            });
            setTimeout(this.hideMessage, 3000);
            console.error(errors);
            return null;
        }
        return data.todos;
    }

    async addTodo({ title }) {
        const addQuery = `
          mutation AddTodo {
            insert_todos(objects: {title: "${title}"}) {
              returning {
                id
                title
              }
            }
          }
        `;
        const { errors, data } = await this.processQuery(addQuery, 'AddTodo');
        if (errors || !data) {
            this.showMessage({
                message: 'Failed to add new todo.',
                type: 'danger',
            });
            setTimeout(this.hideMessage, 3000);
            console.error(errors);
            return null;
        }
        this.showMessage({
            message: 'The new todo has been successfully added.',
            type: 'success',
        });
        setTimeout(this.hideMessage, 3000);
        return data;
    }

    async updateTodo({ id, title, completed }) {
        const updateQuery = `
          mutation UpdateTodo {
            update_todos(where: {id: {_eq: "${id}"}}, _set: {completed: ${completed}, title: "${title}"}) {
              returning {
                id
                title
                completed
              }
            }
          }
        `;
        const { errors, data } = await this.processQuery(
            updateQuery,
            'UpdateTodo',
        );
        if (errors || !data) {
            this.showMessage({
                message: 'Failed to update the todo.',
                type: 'danger',
            });
            setTimeout(this.hideMessage, 3000);
            console.error(errors);
            return null;
        }
        this.showMessage({
            message: 'Todo updated successfully.',
            type: 'success',
        });
        setTimeout(this.hideMessage, 3000);
        return data;
    }

    async deleteTodo({ id }) {
        const deleteQuery = `
          mutation DeleteTodo {
            delete_todos(where: {id: {_eq: "${id}"}}) {
              returning {
                id
              }
            }
          }
        `;
        const { errors, data } = await this.processQuery(
            deleteQuery,
            'DeleteTodo',
        );
        if (errors || !data) {
            this.showMessage({
                message: 'Failed to delete the todo.',
                type: 'danger',
            });
            setTimeout(this.hideMessage, 3000);
            console.error(errors);
            return null;
        }
        this.showMessage({
            message: 'Todo deleted successfully.',
            type: 'success',
        });
        setTimeout(this.hideMessage, 3000);
        return data;
    }

    processQuery(query, operationName) {
        return this.fetchGraphQL(query, operationName, {});
    }

    fetchGraphQL = async (queryString, operationName, variables) => {
        this.showLoader();
        const response = await fetch(Config.url, {
            method: 'POST',
            body: JSON.stringify({
                query: queryString,
                variables: variables,
                operationName: operationName,
            }),
        });
        let data = null;
        try {
            data = await response.json();
        } catch (err) {
            this.showMessage({ message: err.message, type: 'danger' });
            setTimeout(this.hideMessage, 3000);
        }
        setTimeout(() => this.hideLoader(), 300);
        return data;
    };
}
