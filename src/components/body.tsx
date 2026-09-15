import { useEffect, useMemo, useState } from "react";
import data from "../../data.json";

import SearchIcon from "../icons/search";
import Info from "./info";

const REGIONS = [
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

export type Country = (typeof data)[0];

const getCountryFromUrl = () => {
  const countryCode = new URLSearchParams(window.location.search).get(
    "country",
  );

  return countryCode
    ? data.find(
        (country) =>
          country.alpha3Code.toLowerCase() === countryCode.toLowerCase(),
      )
    : undefined;
};

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    getCountryFromUrl,
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const countries = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    return data.filter((country) => {
      const matchesSearch =
        !search ||
        country.name.toLowerCase().includes(search) ||
        country.nativeName.toLowerCase().includes(search) ||
        country.demonym.toLowerCase().includes(search);
      const matchesRegion =
        !region || country.region.toLowerCase() === region.toLowerCase();

      return matchesSearch && matchesRegion;
    });
  }, [searchText, region]);

  useEffect(() => {
    const handlePopState = () => setSelectedCountry(getCountryFromUrl());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleViewMore = (country: Country) => {
    const countryUrl = new URL(
      import.meta.env.BASE_URL,
      window.location.origin,
    );

    countryUrl.searchParams.set("country", country.alpha3Code.toLowerCase());

    window.history.pushState({}, "", countryUrl);
    setSelectedCountry(country);
  };

  const handleViewLess = () => {
    window.history.replaceState({}, "", import.meta.env.BASE_URL);
    setSelectedCountry(undefined);
  };

  return (
    <div className="container mx-auto">
      {selectedCountry ? (
        <Info
          handleBack={handleViewLess}
          handleCountrySelect={handleViewMore}
          info={selectedCountry}
        />
      ) : (
        <div className="w-full flex flex-col gap-8">
          {/* search and filter through data */}
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Search component */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="search-input flex items-center gap-2 bg-surface rounded-md p-4 shadow h-16 w-full md:w-xs"
            >
              <SearchIcon />
              <input
                className="bg-transparent border-none text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body focus-visible:ring-offset-2"
                type="text"
                placeholder="Search for a country..."
                aria-label="Search for a country"
                value={searchText}
                onChange={handleSearch}
              />
            </form>

            {/* Region component */}
            <select
              aria-label="Filter by region"
              className="region-input bg-surface rounded-md p-4 shadow h-16 w-52 md:w-xs text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body focus-visible:ring-offset-2"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
            >
              <option value="">All regions</option>
              {REGIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {countries?.length > 0 ? (
            <div className="w-full grid flex-col gap-8 px-8 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between">
              {countries?.map((info) => (
                <button
                  key={info.alpha3Code}
                  type="button"
                  onClick={() => handleViewMore(info)}
                  className="flex flex-col gap-4 bg-surface text-body text-left border-0 shadow rounded-md pb-10 w-full cursor-pointer hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body focus-visible:ring-offset-4"
                >
                  <img
                    src={info.flag}
                    alt=""
                    loading="lazy"
                    className="w-full h-64 md:h-60 rounded-t-md object-cover shadow"
                  />

                  <span className="text-2xl font-bold px-4">{info.name}</span>

                  <span className="flex flex-col gap-2 px-4">
                    <span>
                      <span className="font-semibold">Population: </span>
                      <span>{info.population}</span>
                    </span>

                    <span>
                      <span className="font-semibold">Region: </span>
                      <span>{info.region}</span>
                    </span>

                    <span>
                      <span className="font-semibold">Capital: </span>
                      <span>{info.capital}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <p>No results found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Body;
