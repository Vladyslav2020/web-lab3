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

    constructor(showLoader, hideLoader) {
        this.showLoader = showLoader;
        this.hideLoader = hideLoader;
    }

    async fetchTodos() {
        const { errors, data } = await this.processQuery(
            QueryService.downloadQuery,
            'DownloadTodos',
        );
        if (errors) {
            console.error(errors);
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
        if (errors) {
            console.error(errors);
        }
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
        if (errors) {
            console.error(errors);
        }
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
        if (errors) {
            console.error(errors);
        }
        return data;
    }

    processQuery(query, operationName) {
        return this.fetchGraphQL(query, operationName, {});
    }

    fetchGraphQL = async (queryString, operationName, variables) => {
        this.showLoader();
        const response = await fetch(
            'https://heroku-app-lab3.herokuapp.com/v1/graphql',
            {
                method: 'POST',
                body: JSON.stringify({
                    query: queryString,
                    variables: variables,
                    operationName: operationName,
                }),
            },
        );
        const data = await response.json();
        setTimeout(() => this.hideLoader(), 300);
        return data;
    };
}
