import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Form, InputField } from "./Form.component";

expect.extend(toHaveNoViolations);

beforeAll(() => {
  // JSDom does not implement this and an error was being
  // thrown from jest-axe because of it.
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
});

it("should not have accesibility issues", async () => {
  const { container } = render(
    <Form onSubmit={() => {}}>
      {() => <InputField name="name" ariaLabel="arialabel"></InputField>}
    </Form>
  );
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
