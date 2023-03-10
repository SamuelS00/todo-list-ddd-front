import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Todo } from "../../types/Todo";
import { useCreateTodoMutation } from "./todoSlice";
import { TodoForm } from "./components/TodoForm";

export const TodoCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createTodo, status] = useCreateTodoMutation();
  const [todoState, setTodoState] = useState<Todo>({
    id: "",
    title: "",
    priority: 2,
    description: "",
    is_scratched: false,
    created_at: new Date()
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createTodo(todoState);
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
    if (status.isSuccess) {
      enqueueSnackbar(`Todo created successfully`, { variant: "success" });
    }
    if (status.error) {
      enqueueSnackbar(`Todo not created`, { variant: "error" });
    }
  }, [enqueueSnackbar, status, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Todo</Typography>
          </Box>
        </Box>
        <TodoForm
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          todo={todoState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}        />
      </Paper>
    </Box>
  );
};