import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  screen,
  waitFor,
  renderWithProviders,
} from "../../utils/test-utils";
import { TodoCreate } from "./TodoCreate";
import { baseUrl } from "../api/apiSlice";

const handlers = [
  rest.post(`${baseUrl}/todos`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("TodoCreate", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render todo create page", () => {
    const { asFragment } = renderWithProviders(<TodoCreate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<TodoCreate />);

    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");
    const submit = screen.getByText("Save");

    fireEvent.change(title, { target: { value: "test" } });
    fireEvent.change(description, { target: { value: "test description" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(
        screen.getByText("Todo created successfully")
      ).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/todos`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<TodoCreate />);
    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");
    const submit = screen.getByText("Save");

    fireEvent.change(title, { target: { value: "test" } });
    fireEvent.change(description, { target: { value: "test description" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByText("Todo not created")).toBeInTheDocument();
    });
  });
})
