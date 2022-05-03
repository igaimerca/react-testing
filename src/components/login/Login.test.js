import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({

    __esModule: true,

    default: {
        get: () => ({
            data: { id: 1, name: "John" }
        })
    }
}))

test("username input should be rendered", () => {
    render(<Login />);
    const userInputEl = screen.getByPlaceholderText(/username/i);
    expect(userInputEl).toBeInTheDocument;
});

test("password input should be rendered", () => {
    render(<Login />);
    const passInputEl = screen.getByPlaceholderText(/password/i);
    expect(passInputEl).toBeInTheDocument;
});

test("button should be rendered", () => {
    render(<Login />);
    const btnEl = screen.getByRole("button");
    expect(btnEl).toBeInTheDocument;
});

test("username input should be empty", () => {
    render(<Login />);
    const userInputEl = screen.getByPlaceholderText(/username/i);
    expect(userInputEl.value).toBe("");
});

test("password input should be empty", () => {
    render(<Login />);
    const passInputEl = screen.getByPlaceholderText(/password/i);
    expect(passInputEl.value).toBe("");
});

test("button should be disabled", () => {
    render(<Login />);
    const btnEl = screen.getByRole("button");
    expect(btnEl).toBeDisabled();
});

test("loading should not be rendered", () => {
    render(<Login />);
    const btnEl = screen.getByRole("button");
    expect(btnEl).not.toHaveTextContent(/please wait/i);
});

test("Loading should be rendered when clicked", () => {
    render(<Login />);
    const btnEl = screen.getByRole("button");

    const userInputEl = screen.getByPlaceholderText(/username/i);
    const passInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(passInputEl, {
        target: { value: testValue },
    });
    fireEvent.change(userInputEl, {
        target: { value: testValue },
    });
    fireEvent.click(btnEl);

    expect(btnEl).toHaveTextContent(/please wait/i);
});

test("Loading should not be rendered after fetching", async () => {
    render(<Login />);
    const btnEl = screen.getByRole("button");

    const userInputEl = screen.getByPlaceholderText(/username/i);
    const passInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(passInputEl, {
        target: { value: testValue },
    });
    fireEvent.change(userInputEl, {
        target: { value: testValue },
    });
    fireEvent.click(btnEl);

    await waitFor(() => expect(btnEl).not.toHaveTextContent(/please wait/i));
});


test("user should be rendered after fetching", async () => {
    render(<Login />);
    const btnEl = screen.getByRole("button");

    const userInputEl = screen.getByPlaceholderText(/username/i);
    const passInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(passInputEl, {
        target: { value: testValue },
    });
    fireEvent.change(userInputEl, {
        target: { value: testValue },
    });
    fireEvent.click(btnEl);

    const userItem  = await screen.findByText("John");

    () => expect(userItem).toBeInTheDocument();
});


test("error message should not be visible", () => {
    render(<Login />);
    const errorEl = screen.getByTestId(/error/i);
    expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
    render(<Login />);
    const userInputEl = screen.getByPlaceholderText(/username/i);
    const testValue = "test";
    fireEvent.change(userInputEl, {
        target: { value: testValue },
    });
    expect(userInputEl.value).toBe(testValue);
});

test("password input should change", () => {
    render(<Login />);
    const passInputEl = screen.getByPlaceholderText(/password/i);
    const testValue = "test";
    fireEvent.change(passInputEl, {
        target: { value: testValue },
    });
    expect(passInputEl.value).toBe(testValue);
});

test("Button should not be disabled when inputs exist", () => {
    render(<Login />);
    const btnEl = screen.getByRole("button");

    const userInputEl = screen.getByPlaceholderText(/username/i);
    const passInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(passInputEl, {
        target: { value: testValue },
    });
    fireEvent.change(userInputEl, {
        target: { value: testValue },
    });

    expect(btnEl).not.toBeDisabled();
});
