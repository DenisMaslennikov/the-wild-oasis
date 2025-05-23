import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./hooks/useSettings.ts";
import Spinner from "../../ui/Spinner.tsx";
import useUpdateSetting from "./hooks/useUpdateSetting.ts";
import React from "react";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (!settings || isLoading) return <Spinner />;

  const {
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
    breakfastPrice,
  } = settings;

  function handleUpdate(
    e: React.FocusEvent<HTMLInputElement>,
    fieldName:
      | "minBookingLength"
      | "maxBookingLength"
      | "maxGuestsPerBooking"
      | "breakfastPrice",
  ) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({
      [fieldName]: value,
    });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
