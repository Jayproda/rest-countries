import { useCallback, useEffect, useState } from "react";
import { findCountryByCode, type Country } from "../data/countries";

const getCountryFromUrl = () =>
  findCountryByCode(
    new URLSearchParams(window.location.search).get("country"),
  );

export const useCountryNavigation = () => {
  const [selectedCountry, setSelectedCountry] =
    useState<Country | undefined>(getCountryFromUrl);

  useEffect(() => {
    const handlePopState = () => setSelectedCountry(getCountryFromUrl());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const selectCountry = useCallback((country: Country) => {
    const countryUrl = new URL(import.meta.env.BASE_URL, window.location.origin);

    countryUrl.searchParams.set("country", country.alpha3Code.toLowerCase());
    window.history.pushState({}, "", countryUrl);
    setSelectedCountry(country);
  }, []);

  const showCountryList = useCallback(() => {
    window.history.replaceState({}, "", import.meta.env.BASE_URL);
    setSelectedCountry(undefined);
  }, []);

  return { selectedCountry, selectCountry, showCountryList };
};
