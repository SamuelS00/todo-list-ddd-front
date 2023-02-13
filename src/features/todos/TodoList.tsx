import { Box, Button, Grid, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Todo } from '../../types/Todo';
import { Link } from "react-router-dom";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./todoSlice";
import { TodoTable } from "./components/TodoTable";

const initialOptions = {
  page: 1,
  search: "",
  per_page: 10,
  rowsPerPage: [10, 20, 30],
};

export const TodoList = () => {
  const [options, setOptions] = useState(initialOptions);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetTodosQuery(options);
  const [deleteTodo, deleteTodoStatus] = useDeleteTodoMutation();
  const [updateTodo, updateTodoStatus] = useUpdateTodoMutation();

  async function handleDeleteTodo(id: string) {
    await deleteTodo({ id });
  }

  async function handleCheckedTodo(todo: Todo) {
    const { is_scratched } = todo;
    await updateTodo({ ...todo, is_scratched: !is_scratched})
  }

  function handleOnPageChange(page: number): void {
    setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(per_page: number) {
    setOptions({ ...options, per_page });
  }

  function handleFilterChange(filterModel: GridFilterModel): void {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join(" ");
      setOptions({ ...options, search });
    } else {
      setOptions({ ...options, search: "" });
    }
  }

  useEffect(() => {
    if (deleteTodoStatus.isSuccess) {
      enqueueSnackbar(`Todo deleted successfully`, { variant: "success" });
    }
    if (deleteTodoStatus.error) {
      enqueueSnackbar(`Todo not deleted`, { variant: "error" });
    }
    if (updateTodoStatus.isSuccess && updateTodoStatus.data.data.is_scratched) {
      enqueueSnackbar(`Todo Checked`, { variant: "success" });
    }
  }, [deleteTodoStatus, updateTodoStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching todos</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Grid container>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="h4">Todo List</Typography>
          </Box>
        </Grid>
        {/* New Todo Button*/}
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/todos/create"
              sx={{ mb: "1rem" }}
            >
              New Todo
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* Todo Table */}
      <TodoTable
        data={data}
        isFetching={isFetching}
        perPage={options.per_page}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteTodo}
        handleChecked={handleCheckedTodo}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
};