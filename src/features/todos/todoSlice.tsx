import {
  Todo,
  TodoParams,
  Result,
  Results,
} from "../../types/Todo";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/todos";

function getTodos({ page = 1, per_page = 10, filter = "" }) {
  const params = { page, per_page, filter };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function parseQueryParams(params: TodoParams): string {
  const query = new URLSearchParams();

  params.page && query.append("page", params.page.toString());
  params.per_page && query.append("per_page", params.per_page.toString());
  params.filter && query.append("filter", params.filter.toString());

  return query.toString();
}

function getTodoQuery({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "GET",
  };
}

function createTodoMutation(todo: Todo) {
  return { url: endpointUrl, method: "POST", body: todo };
}

function updateTodoMutation(todo: Todo) {
  return {
    url: `${endpointUrl}/${todo.id}`,
    method: "PUT",
    body: todo,
  };
}

function deleteTodoMutation(Todo: Todo) {
  return {
    url: `${endpointUrl}/${Todo.id}`,
    method: "DELETE",
  };
}

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getTodos: query<Results, TodoParams>({
      query: getTodos,
      providesTags: ["Todos"],
    }),
    getTodo: query<Result, { id: string }>({
      query: getTodoQuery,
      providesTags: ["Todos"],
    }),
    createTodo: mutation<Result, Todo>({
      query: createTodoMutation,
      invalidatesTags: ["Todos"],
    }),
    updateTodo: mutation<Result, Todo>({
      query: updateTodoMutation,
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: mutation<{}, { id: string }>({
      query: deleteTodoMutation,
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApiSlice;