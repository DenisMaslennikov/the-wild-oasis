import { Cabin, CabinApi } from "../types/Cabin.ts";

function toCabin(api: CabinApi): Cabin {
  const { created_at, ...data } = api;
  return {
    ...data,
    createdAt: new Date(created_at),
  };
}

export { toCabin };
