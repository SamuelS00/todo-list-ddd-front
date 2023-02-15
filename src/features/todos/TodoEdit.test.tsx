import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../api/apiSlice";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";

import { TodoEdit } from "./TodoEdit";

const todo = {
  data: {
    id: "260926c6-4e76-40e0-9170-b9907f0d37b0",
    title: "Todo 1",
    priority: 1,
    description: "Description 1",
    is_scratched: false,
    created_at: "2022-01-17 00:44:21",
  },
};

export const handlers = [
  rest.get(`${baseUrl}/todos/`, (_, res, ctx) => {
    return res(ctx.json(todo), ctx.delay(150));
  }),
  rest.put(
    `${baseUrl}/todos/260926c6-4e76-40e0-9170-b9907f0d37b0`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.delay(150));
    }
  ),
];

const server = setupServer(...handlers);

describe("TodoEdit", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render todo edit page", () => {
    const { asFragment } = renderWithProviders(<TodoEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<TodoEdit />);

    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");

    await waitFor(() => {
      expect(title).toHaveValue("Todo 1");
    });

    fireEvent.change(title, { target: { value: "Todo 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });

    const submit = screen.getByText("Save");
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Success updating todo");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(
        `${baseUrl}/todos/260926c6-4e76-40e0-9170-b9907f0d37b0`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
  
    renderWithProviders(<TodoEdit />);

    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");

    await waitFor(() => {
      expect(title).toHaveValue("Todo 1");
    });

    fireEvent.change(title, { target: { value: "Todo 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });

    const submit = screen.getByText("Save");
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Error updating todo");
      expect(text).toBeInTheDocument();
    });
  });
});