import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Todo } from "../../types/Todo";
import {
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "./todoSlice";
import { TodoForm } from "./components/TodoForm";

export const TodoEdit = () => {
  const id = useParams().id ?? "";
  const { data: todo, isFetching } = useGetTodoQuery({ id });
  const [updateTodo, status] = useUpdateTodoMutation();
  const [todoState, setTodoState] = useState<Todo>({
    id: "",
    title: "",
    priority: 2,
    description: "",
    is_scratched: false,
    created_at: null
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateTodo(todoState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'priority') {
      setTodoState({ ...todoState, created_at: null, [name]: parseInt(value) });
    } else {
      setTodoState({ ...todoState, created_at: null, [name]: value });
    }
  };

  useEffect(() => {
    if (todo) {
      setTodoState(todo.data);
    }
  }, [todo]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Success updating todo`, { variant: "success" });
    }
    if (status.error) {
      enqueueSnackbar(`Error updating todo`, { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Todo</Typography>
          </Box>
        </Box>
        <TodoForm
          todo={todoState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isDisabled={status.isLoading}
          isLoading={isFetching || status.isLoading}
        />
      </Paper>
    </Box>
  );
};