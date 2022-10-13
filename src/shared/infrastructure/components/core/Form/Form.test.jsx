import { fireEvent, render, screen } from "@testing-library/react";
import { Form, InputField, SubmitButton } from "./Form.component";

describe("Form component", () => {
  describe("When click on send", () => {
    it("sends all data filled", () => {
      const onSubmitFn = jest.fn((x) => x);
      render(
        <Form onSubmit={onSubmitFn}>
          {(formData, setFormData) => (
            <>
              <InputField
                ariaLabel="name-input"
                name="name"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {formData.name}
              </InputField>
              <InputField
                ariaLabel="surname-input"
                name="surname"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {formData.surname}
              </InputField>
              <SubmitButton ariaLabel="submit-button">Send</SubmitButton>
            </>
          )}
        </Form>
      );
      const nameInput = screen.getByLabelText("name-input");
      fireEvent.change(nameInput, { target: { value: "::title::" } });

      const submitButton = screen.getByLabelText("submit-button");
      fireEvent.click(submitButton);

      expect(onSubmitFn).toHaveBeenCalledTimes(1);
      expect(onSubmitFn).toHaveBeenCalledWith({ name: "::title::" });
    });
    it("throws error when InputField is not sent a name prop", () => {
      const renderedComponent = (
        <Form onSubmit={() => {}}>
          {(formData, setFormData) => (
            <>
              <InputField
                ariaLabel="name-input"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {formData}
              </InputField>
            </>
          )}
        </Form>
      );

      expect(() => render(renderedComponent)).toThrow();
    });
    it("should reset the form", () => {
      const onSubmitFn = jest.fn((x) => x);
      render(
        <Form onSubmit={onSubmitFn}>
          {(formData, setFormData) => (
            <>
              <InputField
                ariaLabel="name-input"
                name="name"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {formData.name}
              </InputField>
              <InputField
                ariaLabel="surname-input"
                name="surname"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {formData.surname}
              </InputField>
              <SubmitButton ariaLabel="submit-button">Send</SubmitButton>
            </>
          )}
        </Form>
      );

      const nameInput = screen.getByLabelText("name-input");
      fireEvent.change(nameInput, { target: { value: "::name::" } });

      const surnameInput = screen.getByLabelText("surname-input");
      fireEvent.change(surnameInput, { target: { value: "::surname::" } });

      const submitButton = screen.getByLabelText("submit-button");
      fireEvent.click(submitButton);

      expect(onSubmitFn).toHaveBeenCalledWith({
        name: "::name::",
        surname: "::surname::",
      });

      const nameInputAfterSubmit = screen.getByLabelText("name-input");
      const surnameInputAfterSubmit = screen.getByLabelText("surname-input");

      expect(nameInputAfterSubmit).not.toHaveValue();
      expect(surnameInputAfterSubmit).not.toHaveValue();
    });
  });
});
