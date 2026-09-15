import type { Country } from "../data/countries";
import CountryCard from "./CountryCard";

interface CountryGridProps {
  countries: Country[];
  onCountrySelect: (country: Country) => void;
}

const CountryGrid = ({ countries, onCountrySelect }: CountryGridProps) => (
  <section aria-labelledby="countries-heading">
    <h2 id="countries-heading" className="sr-only">
      Countries
    </h2>
    {countries.length > 0 ? (
      <div className="w-full grid flex-col gap-8 px-8 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between">
        {countries.map((country) => (
          <CountryCard
            key={country.alpha3Code}
            country={country}
            onSelect={onCountrySelect}
          />
        ))}
      </div>
    ) : (
      <p role="status">No results found</p>
    )}
  </section>
);

export default CountryGrid;
