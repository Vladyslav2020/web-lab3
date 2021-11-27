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

    async fetchGraphQL(queryString, operationName, variables) {
        const result = await fetch(
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

        return await result.json();
    }
}
