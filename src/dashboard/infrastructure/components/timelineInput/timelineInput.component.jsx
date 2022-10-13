import React from "react";
import {
  Form,
  InputField,
  SubmitButton,
} from "../../../../shared/infrastructure/components/core/Form/Form.component";

export const TimelineInput = ({ createCommentUseCase }) => {
  return (
    <Form
      onSubmit={(data) => {
        createCommentUseCase({ content: data.content });
      }}
    >
      {(formData, setFormData) => (
        <>
          <InputField
            ariaLabel="content"
            name="content"
            onChange={(e) => {
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              });
            }}
          >
            {formData.content}
          </InputField>
          <SubmitButton ariaLabel="submit-button" disabled={!formData.content}>
            Add
          </SubmitButton>
        </>
      )}
    </Form>
  );
};
