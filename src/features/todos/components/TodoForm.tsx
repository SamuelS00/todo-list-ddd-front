import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Todo } from "../../../types/Todo";

type Props = {
  todo: Todo;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TodoForm = ({
  todo,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
}: Props) => {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="title"
                label="Title"
                value={todo.title}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "title" }}
              />
            </FormControl>
          </Grid>
          {/* Priority */}
          <Grid item xs={12}>
            <FormControl 
              component="fieldset"
              required
            >
              <RadioGroup aria-label="priority" name="priority" value={todo.priority} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Low" />
                <FormControlLabel value="2" control={<Radio />} label="Medium" />
                <FormControlLabel value="3" control={<Radio />} label="High" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* Description */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="description"
                label="Description"
                value={todo.description}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "description" }}
              />
            </FormControl>
          </Grid>
          {/* Buttons */}
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              {/* Back */}
              <Button variant="contained" component={Link} to="/todos">
                Back
              </Button>
              {/* Save */}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "Loading" : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};