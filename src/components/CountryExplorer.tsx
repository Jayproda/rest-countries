import { useState } from "react";
import CountryDetails from "./CountryDetails";
import CountryGrid from "./CountryGrid";
import ExplorerControls, { type RegionOption } from "./ExplorerControls";
import { useCountryNavigation } from "../hooks/useCountryNavigation";
import { useFilteredCountries } from "../hooks/useFilteredCountries";

const REGIONS: RegionOption[] = [
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

const CountryExplorer = () => {
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState("");
  const countries = useFilteredCountries(searchText, region);
  const { selectedCountry, selectCountry, showCountryList } =
    useCountryNavigation();

  return (
    <div className="container mx-auto">
      {selectedCountry ? (
        <CountryDetails
          country={selectedCountry}
          onBack={showCountryList}
          onCountrySelect={selectCountry}
        />
      ) : (
        <div className="w-full flex flex-col gap-8">
          <ExplorerControls
            onRegionChange={setRegion}
            onSearchChange={setSearchText}
            region={region}
            regions={REGIONS}
            searchText={searchText}
          />
          <CountryGrid
            countries={countries}
            onCountrySelect={selectCountry}
          />
        </div>
      )}
    </div>
  );
};

export default CountryExplorer;
