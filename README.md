# REST Countries Explorer

A responsive country explorer built for the [Frontend Mentor REST Countries challenge](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Users can search and filter the supplied country data, open detailed country views, navigate between bordering countries, and choose a persistent light or dark theme.

## Overview

### The challenge

Users can:

- View countries in a responsive grid
- Search by country name, native name, or demonym
- Combine text search with region filtering
- Open a country detail view and navigate to bordering countries
- Use shareable country URLs with browser Back and Forward support
- Switch between light and dark themes, with their preference remembered
- Navigate the complete interface with a keyboard

### Links

- [Live site](https://rest-countries-github-io.vercel.app/)
- [Frontend Mentor solution](https://www.frontendmentor.io/solutions/responsive-rest-countries-with-vite-Jtr46bFOp_)
- [Source code](https://github.com/Jayproda/rest-countries)

### Design reference

![REST Countries desktop design reference](./project-info/design/desktop-design-home-light.jpg)

The image above is the challenge design reference. Visit the live site to see the implemented solution.

## My process

### Built with

- Semantic HTML5
- CSS custom properties and `light-dark()` theme tokens
- Tailwind CSS utilities
- React
- TypeScript
- Vite
- The browser History API for shareable detail views
- Local JSON country data supplied with the challenge

### Architecture

The UI is divided by responsibility:

- `ExplorerControls` owns the search and region controls
- `CountryExplorer` coordinates the list and detail views
- `CountryGrid` and `CountryCard` render the result collection
- `CountryDetails` renders country facts and border navigation
- `useFilteredCountries` derives results from both active filters
- `useCountryNavigation` coordinates selected-country state with the URL
- `src/data/countries.ts` owns the shared country type and data lookups

### What I learned

The most useful lesson was treating filtered countries as derived data instead of storing another copy in state. Applying the search and region predicates together prevents one control from silently resetting the other.

I also explored how a small application can support refreshable, shareable detail views without introducing a full routing dependency. A country code in the query string works with both Vercel and GitHub Pages, while the History API keeps Back and Forward navigation meaningful.

The accessibility pass reinforced that visual click affordances are not enough. Native buttons and selects provide keyboard behavior and semantics by default, while focus management is still needed when React replaces the list with a detail view.

### Challenges

- Coordinating search, region, and detail state without duplicated sources of truth
- Resolving border codes into full country records while keeping presentation components independent of the JSON source
- Supporting direct detail links under Vite's different local, GitHub Pages, and Vercel base paths
- Preserving light and dark preferences without a flash of the wrong theme

### Continued development

The next priority is automated testing. The filtering utility is a good unit-test boundary, followed by component tests for combined filters, URL navigation, border navigation, theme persistence, and keyboard focus after opening a country.

## Run locally

```bash
npm install
npm run dev
```

Useful project checks:

```bash
npm run lint
npm run build
```

## Author

- GitHub: [@Jayproda](https://github.com/Jayproda)
- Frontend Mentor: [Solution page](https://www.frontendmentor.io/solutions/responsive-rest-countries-with-vite-Jtr46bFOp_)
