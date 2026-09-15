import SearchIcon from "../icons/Search";

export interface RegionOption {
  value: string;
  label: string;
}

interface ExplorerControlsProps {
  onRegionChange: (region: string) => void;
  onSearchChange: (query: string) => void;
  region: string;
  regions: RegionOption[];
  searchText: string;
}

const ExplorerControls = ({
  onRegionChange,
  onSearchChange,
  region,
  regions,
  searchText,
}: ExplorerControlsProps) => (
  <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-8">
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="search-input flex items-center gap-2 bg-surface rounded-md p-4 shadow h-16 w-full md:w-xs"
    >
      <SearchIcon />
      <label className="sr-only" htmlFor="country-search">
        Search for a country
      </label>
      <input
        id="country-search"
        className="bg-transparent border-none text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body focus-visible:ring-offset-2"
        type="search"
        placeholder="Search for a country..."
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </form>

    <label className="sr-only" htmlFor="region-filter">
      Filter by region
    </label>
    <select
      id="region-filter"
      className="region-input bg-surface rounded-md p-4 shadow h-16 w-52 md:w-xs text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-body focus-visible:ring-offset-2"
      value={region}
      onChange={(event) => onRegionChange(event.target.value)}
    >
      <option value="">All regions</option>
      {regions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default ExplorerControls;
