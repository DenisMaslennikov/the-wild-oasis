import { useEffect, useRef, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUser from "./hooks/useUser";
import useUpdateUser from "./hooks/useUpdateUser.ts";
import Spinner from "../../ui/Spinner.tsx";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user, isLoading } = useUser();

  const formRef = useRef<HTMLFormElement>(null);

  const { updateCurrentUser, isUserUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const email = user?.email ?? "";
  const currentFullName = user?.user_metadata?.fullName ?? "";

  useEffect(() => {
    setFullName(currentFullName);
  }, [currentFullName]);

  if (!user || isLoading) return <Spinner />;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;
    updateCurrentUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          formRef.current?.reset();
        },
      },
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUserUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files && e.target.files[0])}
          disabled={isUserUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUserUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUserUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
