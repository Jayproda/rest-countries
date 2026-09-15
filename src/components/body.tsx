import { useEffect, useState } from "react";
import data from "../../data.json";

import SearchIcon from "../icons/search";
import ArrowDown from "../icons/arrow-down";
import ArrowUp from "../icons/arrow-up";
import Info from "./info";

const REGIONS = [
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

export type COUNTRY = (typeof data)[0];
export type REGION = (typeof REGIONS)[0];

const body = () => {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState<COUNTRY[]>(data);
  const [region, setRegion] = useState<REGION>({
    value: "",
    label: "Filter by Region",
  });
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<COUNTRY | undefined>(
    undefined,
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText) {
      const sameCase = (text: string) => text?.toLowerCase()?.toString();

      const filteredData = data?.filter(
        (info) =>
          sameCase(info?.name)?.includes(searchText) ||
          sameCase(info?.nativeName).includes(searchText) ||
          sameCase(info?.demonym)?.includes(searchText),
      );

      setCountries(filteredData);
    } else {
      setCountries(data);
    }

    return () => {};
  }, [searchText]);

  const handleRegion = (info: REGION) => {
    const countries = data?.filter(
      (countryInfo) =>
        countryInfo?.region?.toUpperCase() === info?.value?.toUpperCase(),
    );

    setCountries(countries);
    setRegion(info);
    setIsRegionOpen(false);
  };

  const handleViewMore = (country: COUNTRY) => {
    setViewMore(true);
    setSelectedCountry(country);
  };

  const handleViewLess = () => {
    setViewMore(false);
    setSelectedCountry(undefined);
  };

  return (
    <div className="container mx-auto">
      {viewMore && selectedCountry ? (
        <Info handleBack={handleViewLess} info={selectedCountry} />
      ) : (
        <div className="w-full flex flex-col gap-8">
          {/* search and filter through data */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Search component */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="search-input flex items-center gap-2 bg-surface rounded-md p-4 shadow h-16 w-full md:w-xs"
            >
              <SearchIcon />
              <input
                className="bg-transparent outline-none border-none text-body"
                type="text"
                placeholder="Search for a country..."
                value={searchText}
                onChange={handleSearch}
              />
            </form>

            {/* Region component */}
            <div
              id="region"
              className="region-input flex flex-col gap-2 justify-between w-52 md:w-xs relative"
            >
              <input
                id="region-filter"
                name="region"
                type="checkbox"
                className="peer hidden"
                checked={isRegionOpen}
                onChange={(e) => setIsRegionOpen(e.target.checked)}
              />

              <label
                htmlFor="region-filter"
                className="flex items-center justify-between bg-surface rounded-md p-4 shadow h-16 w-full"
              >
                <span>{region?.label}</span>

                <span className="text-accent">
                  {isRegionOpen ? (
                    <ArrowUp className="arrowUp" fill="currentColor" />
                  ) : (
                    <ArrowDown className="arrowDown" fill="currentColor" />
                  )}
                </span>
              </label>

              <div className="hidden peer-checked:block peer-checked:absolute top-18 bg-surface rounded-md p-4 shadow w-full z-10">
                <div className="flex flex-col gap-1 items-start">
                  {REGIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleRegion(option)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid flex-col gap-8 px-8 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between">
            {countries?.map((info) => (
              <div
                key={info?.name + info?.nativeName}
                onClick={() => handleViewMore(info)}
                className="flex flex-col gap-4 bg-surface shadow rounded-md pb-10 w-full hover:cursor-pointer hover:scale-105"
              >
                <div
                  className="w-full h-64 md:h-60 rounded-t-md bg-center bg-cover bg-no-repeat shadow"
                  style={{
                    backgroundImage: `url('${info?.flag}')` || undefined,
                    backgroundPosition: "50% 50%",
                  }}
                ></div>

                <h3 className="text-2xl font-bold px-4">{info?.name}</h3>

                <div className="flex flex-col gap-2 px-4">
                  <p>
                    <span className="font-semibold">Population: </span>
                    <span>{info?.population}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Region: </span>
                    <span>{info?.region}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Capital: </span>
                    <span>{info?.capital}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default body;
