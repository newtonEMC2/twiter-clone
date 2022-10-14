import React from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  InputField,
  SubmitButton,
} from "../../../../shared/infrastructure/components/core/Form/Form.component";

export const TimelineInput = ({ createCommentUseCase }) => {
  const dispatch = useDispatch();
  return (
    <Form
      onSubmit={(data) => {
        createCommentUseCase({ content: data.content, dispatch });
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
