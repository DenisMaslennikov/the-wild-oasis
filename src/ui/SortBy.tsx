import Select from "./Select.tsx";
import React from "react";
import { useSearchParams } from "react-router-dom";

type SortOption = { value: string; label: string };

function SortBy({ options }: { options: [SortOption, ...SortOption[]] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") ?? options[0].value;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortBy}
      $type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
