import { Config } from './Config';

export class QueryService {
    static downloadQuery = `
      query DownloadTodos {
        todo(order_by: {}) {
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
            console.log(errors);
            return null;
        }
        return data.todo;
    }

    async addTodo({ title }) {
        const addQuery = `
          mutation AddTodo {
            insert_todo(objects: {title: "${title}"}) {
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
            console.log(errors);
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
            update_todo(where: {id: {_eq: "${id}"}}, _set: {completed: ${completed}, title: "${title}"}) {
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
            console.log(errors);
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
            delete_todo(where: {id: {_eq: "${id}"}}) {
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
            console.log(errors);
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
        let data = { data: null, errors: null };
        try {
            this.showLoader();
            const response = await fetch(Config.url, {
                method: 'POST',
                body: JSON.stringify({
                    query: queryString,
                    variables: variables,
                    operationName: operationName,
                }),
                headers: {
                    'x-hasura-admin-secret': Config.adminSecret,
                },
            });
            data = await response.json();
        } catch (err) {
            this.showMessage({ message: err.message, type: 'danger' });
            setTimeout(this.hideMessage, 3000);
            data.errors = err;
        }
        setTimeout(() => this.hideLoader(), 300);
        return data;
    };
}
