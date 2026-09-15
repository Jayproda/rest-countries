import countryData from "../../data.json";

export type Country = (typeof countryData)[number];

export const countries: Country[] = countryData;

export const findCountryByCode = (code: string | null) => {
  if (!code) return undefined;

  const normalizedCode = code.toLowerCase();

  return countries.find(
    (country) =>
      country.alpha2Code.toLowerCase() === normalizedCode ||
      country.alpha3Code.toLowerCase() === normalizedCode,
  );
};

export const getBorderCountries = (country: Country) =>
  country.borders?.flatMap((borderCode) => {
    const borderCountry = findCountryByCode(borderCode);
    return borderCountry ? [borderCountry] : [];
  }) ?? [];

export const filterCountries = (query: string, region: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  return countries.filter(
    (country) =>
      (!region || country.region === region) &&
      [country.name, country.nativeName, country.demonym].some((text) =>
        text.toLowerCase().includes(normalizedQuery),
      ),
  );
};
