import data from "../../data.json";
import type { Country } from "./body";
import ArrowRightLong from "../icons/arrow-right-long";

interface IProps {
  handleBack: () => void;
  handleCountrySelect: (country: Country) => void;
  info: Country;
}

const Info = ({ handleBack, handleCountrySelect, info }: IProps) => {
  const borderCountries = info.borders?.flatMap((border) => {
    const country = data?.find(
      (data) => data?.alpha3Code === border || data?.alpha2Code === border,
    );

    return country ? [country] : [];
  });

  return (
    <div key={info?.name} className="w-full flex flex-col gap-10">
      <button
        className="bg-surface px-3 py-1 shadow flex items-center gap-1 w-fit"
        type="button"
        onClick={handleBack}
      >
        <ArrowRightLong className="rotate-180" fill="currentColor" />
        <span>Back</span>
      </button>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <img
          src={info.flag}
          alt={`Flag of ${info.name}`}
          className="w-full md:max-w-sm h-60 xs:h-72 sm:h-80 rounded-t-md object-cover shadow lg:col-span-1"
        />

        <div className="grid gap-5 lg:col-span-2">
          <h3 className="text-2xl font-bold">{info?.name}</h3>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              {info?.nativeName && (
                <p>
                  <span className="font-semibold">Native Name: </span>
                  <span>{info?.nativeName}</span>
                </p>
              )}

              {info?.population && (
                <p>
                  <span className="font-semibold">Population: </span>
                  <span>{info?.population}</span>
                </p>
              )}

              {info?.region && (
                <p>
                  <span className="font-semibold">Region: </span>
                  <span>{info?.region}</span>
                </p>
              )}

              {info?.subregion && (
                <p>
                  <span className="font-semibold">Sub Region: </span>
                  <span>{info?.subregion}</span>
                </p>
              )}

              {info?.capital && (
                <p>
                  <span className="font-semibold">Capital: </span>
                  <span>{info?.capital}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {info?.topLevelDomain && info?.topLevelDomain?.length > 0 && (
                <p>
                  <span className="font-semibold">Top Level Domain: </span>
                  <span>{info?.topLevelDomain?.join(", ")}</span>
                </p>
              )}

              {info?.currencies && info?.currencies?.length > 0 && (
                <p>
                  <span className="font-semibold">Currencies: </span>
                  <span>
                    {info?.currencies?.map((curr) => curr?.name)?.join(", ")}
                  </span>
                </p>
              )}

              {info?.languages && info?.languages?.length > 0 && (
                <p>
                  <span className="font-semibold">Languages: </span>
                  <span>
                    {info?.languages?.map((lang) => lang?.name)?.join(", ")}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <h4 className="text-base font-bold whitespace-nowrap">
              Border Countries:
            </h4>
            <div className="flex flex-wrap gap-2">
              {borderCountries?.map((borderCountry) => (
                <button
                  key={borderCountry.alpha3Code}
                  className="py-1 px-4 bg-surface text-body shadow border/5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body focus-visible:ring-offset-2"
                  type="button"
                  onClick={() => handleCountrySelect(borderCountry)}
                >
                  {borderCountry.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
