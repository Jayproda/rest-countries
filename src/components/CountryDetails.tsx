import { useEffect, useRef } from "react";
import { getBorderCountries, type Country } from "../data/countries";
import ArrowRightLong from "../icons/ArrowRightLong";

interface CountryDetailsProps {
  country: Country;
  onBack: () => void;
  onCountrySelect: (country: Country) => void;
}

const CountryDetails = ({
  country,
  onBack,
  onCountrySelect,
}: CountryDetailsProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const borderCountries = getBorderCountries(country);

  useEffect(() => {
    headingRef.current?.focus();
    document.title = `${country.name} | Rest Countries`;

    return () => {
      document.title = "Rest Countries";
    };
  }, [country]);

  return (
    <section className="w-full flex flex-col gap-10" aria-labelledby="country-name">
      <button
        className="bg-surface px-3 py-1 shadow flex items-center gap-1 w-fit"
        type="button"
        onClick={onBack}
      >
        <ArrowRightLong className="rotate-180" fill="currentColor" />
        <span>Back</span>
      </button>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          className="w-full md:max-w-sm h-60 xs:h-72 sm:h-80 rounded-t-md object-cover shadow lg:col-span-1"
        />

        <div className="grid gap-5 lg:col-span-2">
          <h2
            id="country-name"
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl font-bold focus:outline-none"
          >
            {country.name}
          </h2>

          <div className="grid gap-5 lg:grid-cols-2">
            <dl className="flex flex-col gap-2">
              <CountryFact label="Native Name" value={country.nativeName} />
              <CountryFact
                label="Population"
                value={country.population.toLocaleString()}
              />
              <CountryFact label="Region" value={country.region} />
              <CountryFact label="Sub Region" value={country.subregion} />
              <CountryFact label="Capital" value={country.capital} />
            </dl>

            <dl className="flex flex-col gap-2">
              <CountryFact
                label="Top Level Domain"
                value={country.topLevelDomain?.join(", ")}
              />
              <CountryFact
                label="Currencies"
                value={country.currencies?.map(({ name }) => name).join(", ")}
              />
              <CountryFact
                label="Languages"
                value={country.languages?.map(({ name }) => name).join(", ")}
              />
            </dl>
          </div>

          {borderCountries.length > 0 && (
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <h3 className="text-base font-bold whitespace-nowrap">
                Border Countries:
              </h3>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((borderCountry) => (
                  <button
                    key={borderCountry.alpha3Code}
                    className="py-1 px-4 bg-surface text-body shadow border/5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body focus-visible:ring-offset-2"
                    type="button"
                    onClick={() => onCountrySelect(borderCountry)}
                  >
                    {borderCountry.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface CountryFactProps {
  label: string;
  value?: string;
}

const CountryFact = ({ label, value }: CountryFactProps) =>
  value ? (
    <div>
      <dt className="font-semibold inline">{label}: </dt>
      <dd className="inline">{value}</dd>
    </div>
  ) : null;

export default CountryDetails;
