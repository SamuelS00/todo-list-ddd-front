import React from 'react';
import { ThemeProvider, Box } from '@mui/material';
import { appTheme } from './config/thema';
import { SnackbarProvider } from 'notistack';
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import { TodoList } from './features/todos/TodoList';
import { TodoCreate } from './features/todos/TodoCreate';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            minHeight: 650,
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Layout>
            <Routes>
              <Route path="/" element={<TodoList />} />
              {/* Todo */}
              <Route path="/todos" element={<TodoList />} />
              <Route path="/todos/create" element={<TodoCreate />} />
              {/* <Route path="/todos/edit/:id" element={<TodoEdit />} /> */}
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
