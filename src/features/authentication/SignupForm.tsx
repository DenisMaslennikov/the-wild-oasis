import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import type { UserForm } from "./types/User.ts";
import useSignup from "./hooks/useSignup.ts";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, handleSubmit, reset } = useForm<UserForm>();
  const { signup, isSignup } = useSignup();
  const { errors } = formState;

  function onSubmit(data: UserForm) {
    signup(data, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSignup}
          {...register("fullName", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Full name minimal length is 6 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSignup}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSignup}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSignup}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
            // or value = getValues().password
          })}
        />
      </FormRow>

      <FormRow>
        {/* $type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" disabled={isSignup}>
          Cancel
        </Button>
        <Button disabled={isSignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
