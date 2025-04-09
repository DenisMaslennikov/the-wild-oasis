import styled from "styled-components";
import { Option } from "../features/settings/types/Option.ts";
import React, { ComponentProps } from "react";

const StyledSelect = styled.select<{ $type?: "white" }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({
  options,
  value,
  onChange,
  ...props
}: {
  options: [Option, ...Option[]];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
} & Omit<ComponentProps<typeof StyledSelect>, "options" | "value">) {
  return (
    <StyledSelect value={value} {...props} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
