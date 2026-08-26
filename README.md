# Movies

A responsive movie discovery app built with HTML, CSS, and JavaScript. The app uses the [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) to display trending movies, search by title, view movie details, watch trailers, and manage a simple local cart flow.

## Features

- Browse weekly trending movies on the home page
- Search movies by title using live TMDB data
- Sort search results alphabetically or by release date
- Navigate paginated search results
- View movie details, including poster, languages, release info, runtime, overview, and trailer
- Add movies to a cart stored in `localStorage`
- Update quantities, remove items, clear the cart, and complete a basic checkout flow
- Toggle between light and dark theme styles
- Responsive layout for desktop and mobile screens
- Accessibility-focused markup with landmarks, focus states, labels, and semantic content

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- TMDB API

## Project Structure

```text
movie-finder/
├── index.html
├── search-movies.html
├── movie.html
├── cart.html
├── checkout.html
├── css/
├── js/
│   ├── api.js
│   ├── index.js
│   ├── search-movies.js
│   ├── cart.js
│   ├── checkout.js
│   ├── movie/
│   └── utilities/
└── assets/
```

## Accessibility

This project was reviewed with axe DevTools and Lighthouse. Accessibility improvements include semantic landmarks, accessible form labels, visible focus states, descriptive image alt text, iframe titles, and keyboard-friendly interactive elements.

Some best-practice warnings may still come from third-party embedded content, such as the YouTube trailer iframe.

## Getting Started

No build step is required. Open `index.html` in a browser.

## What I Practiced

- Fetching and rendering data from a third-party API
- Building multi-page navigation with shared UI patterns
- Splitting shared JavaScript into page helpers under `js/utilities/` and movie-page loader/render files under `js/movie/`
- Managing client-side state with `localStorage`
- Creating reusable CSS utility classes and BEM-style component classes
- Handling loading states, sorting, pagination, and dynamic DOM updates
- Improving accessibility with semantic HTML and assistive technology checks

## References

- [TMDB API Documentation](https://developer.themoviedb.org/reference/intro/getting-started)
- [BEM Naming Convention](https://getbem.com/naming/)
