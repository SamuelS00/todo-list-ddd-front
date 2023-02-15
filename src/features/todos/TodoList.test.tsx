import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../api/apiSlice";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { TodoList } from "./TodoList";
import { todoResponse, todoResponsePage2 } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/todos`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(todoResponsePage2), ctx.delay(150));
    }
    return res(ctx.json(todoResponse), ctx.delay(150));
  }),

  rest.delete(
    `${baseUrl}/todos/221ccbf0-ab00-4d84-a0b8-052840635781`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

describe("TodoList", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render todo list page", () => {
    const { asFragment } = renderWithProviders(<TodoList />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<TodoList />);

    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<TodoList />);

    await waitFor(() => {
      const name = screen.getByText("Dinner");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/todos`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<TodoList />);

    await waitFor(() => {
      const error = screen.getByText("Error fetching todos");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle on page change", async () => {
    renderWithProviders(<TodoList />);

    await waitFor(() => {
      const name = screen.getByText("Dinner");
      expect(name).toBeInTheDocument();
    });
 
    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      const name = screen.getByText("LightSlateGray"); 
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<TodoList />);

    await waitFor(() => {
      const name = screen.getByText("Dinner");
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…");

    fireEvent.change(input, { target: { value: "Chocolate" } });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle delete todo success", async () => {
    renderWithProviders(<TodoList />);

    await waitFor(() => {
      const name = screen.getByText("Dinner");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-action")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Todo deleted successfully");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle delete todo error", async () => {

    server.use(
      rest.delete(
        `${baseUrl}/todos/221ccbf0-ab00-4d84-a0b8-052840635781`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    renderWithProviders(<TodoList />);

    await waitFor(() => {
      const name = screen.getByText("Dinner");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-action")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Todo not deleted");
      expect(name).toBeInTheDocument();
    });
  });
});