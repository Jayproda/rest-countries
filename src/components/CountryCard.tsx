import type { Country } from "../data/countries";

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
}

const CountryCard = ({ country, onSelect }: CountryCardProps) => (
  <button
    type="button"
    onClick={() => onSelect(country)}
    className="flex flex-col gap-4 bg-surface text-body text-left border-0 shadow rounded-md pb-10 w-full cursor-pointer hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body focus-visible:ring-offset-4"
  >
    <img
      src={country.flag}
      alt={`Flag of ${country.name}`}
      loading="lazy"
      className="min-w-72 w-full h-64 md:h-60 rounded-t-md object-cover shadow"
    />

    <span className="text-2xl font-bold px-4">{country.name}</span>

    <span className="flex flex-col gap-2 px-4">
      <span>
        <span className="font-semibold">Population: </span>
        <span>{country.population.toLocaleString()}</span>
      </span>
      <span>
        <span className="font-semibold">Region: </span>
        <span>{country.region}</span>
      </span>
      <span>
        <span className="font-semibold">Capital: </span>
        <span>{country.capital}</span>
      </span>
    </span>
  </button>
);

export default CountryCard;
