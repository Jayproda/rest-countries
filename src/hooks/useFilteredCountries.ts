import { useMemo } from "react";
import { filterCountries } from "../data/countries";

export const useFilteredCountries = (query: string, region: string) =>
  useMemo(() => filterCountries(query, region), [query, region]);
