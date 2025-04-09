import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner.tsx";
import CabinRow from "./CabinRow.tsx";
import useCabins from "./hooks/useCabins.ts";
import Table from "../../ui/Table.tsx";
import { Cabin } from "./types/Cabin.ts";
import Menus from "../../ui/Menus.tsx";
import Empty from "../../ui/Empty.tsx";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") ?? "all";

  let filteredCabins;

  // Filtering
  if (filterValue === "all") filteredCabins = cabins;
  else if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((value) => value.discount === 0);
  else if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((value) => value.discount !== 0);
  else filteredCabins = cabins;

  // Sorting
  type SortableField = "regularPrice" | "maxCapacity" | "name" | "createdAt";

  const sortBy = searchParams.get("sortBy") ?? "createdAt-asc";
  const [rawField, direction] = sortBy.split("-");
  const field: SortableField = (
    ["regularPrice", "maxCapacity", "name", "createdAt"] as const
  ).includes(rawField as SortableField)
    ? (rawField as SortableField)
    : "createdAt";

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins?.sort((a, b) => {
    switch (field) {
      case "name":
        return a.name.localeCompare(b.name) * modifier;
      case "createdAt":
        return (a.createdAt.getTime() - b.createdAt.getTime()) * modifier;
      case "regularPrice":
      case "maxCapacity":
        return (a[field] - b[field]) * modifier;
      default:
        return 0;
    }
  });

  if (!sortedCabins || !sortedCabins.length)
    return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body<Cabin>
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
