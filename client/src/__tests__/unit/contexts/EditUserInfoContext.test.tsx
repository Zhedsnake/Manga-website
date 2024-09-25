import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditUserInfoContext, EditUserInfoContextType } from "../../../contexts/EditUserInfoContext";

const TestComponent = () => {
    const { message, setMessage } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    return (
        <div>
            <div data-testid="message">{message}</div>
            <button onClick={() => setMessage("New message")} data-testid="setMessage-btn">Set Message</button>
        </div>
    );
};

describe("EditUserInfoContext", () => {

    test("должен обновлять значение message при вызове setMessage", () => {
        const setMessage = jest.fn();

        render(
            <EditUserInfoContext.Provider value={{ message: "Initial message", setMessage }}>
                <TestComponent />
            </EditUserInfoContext.Provider>
        );

        expect(screen.getByTestId("message").textContent).toBe("Initial message");

        fireEvent.click(screen.getByTestId("setMessage-btn"));
        expect(setMessage).toHaveBeenCalledWith("New message");
    });

    test("должен использовать начальное значение message", () => {
        render(
            <EditUserInfoContext.Provider value={{ message: "Initial message", setMessage: jest.fn() }}>
                <TestComponent />
            </EditUserInfoContext.Provider>
        );

        expect(screen.getByTestId("message").textContent).toBe("Initial message");
    });

    test("должен обновить message на новое значение", () => {
        const TestComponentWithState = () => {
            const { message, setMessage } = useContext<EditUserInfoContextType>(EditUserInfoContext);

            return (
                <div>
                    <div data-testid="message">{message}</div>
                    <button onClick={() => setMessage("Updated message")} data-testid="updateMessage-btn">Update Message</button>
                </div>
            );
        };

        const setMessageMock = jest.fn();
        render(
            <EditUserInfoContext.Provider value={{ message: "Old message", setMessage: setMessageMock }}>
                <TestComponentWithState />
            </EditUserInfoContext.Provider>
        );

        fireEvent.click(screen.getByTestId("updateMessage-btn"));
        expect(setMessageMock).toHaveBeenCalledWith("Updated message");
    });
});
