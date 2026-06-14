# 🍿 usePopcorn

A sleek, feature-rich React Single Page Application (SPA) that allows users to search for movies, read detailed descriptions, rate them using a custom star component, and maintain a personal watched movies list with auto-calculated statistics.

This project was built as part of Jonas Schmedtmann's Ultimate React Course.

## 🔗 Live Demo

The project is live and deployed on Vercel. You can check it out here:
👉 **[usepopcorn-aav9.vercel.app](https://usepopcorn-gilt-seven.vercel.app/)**

---

## ✨ Features

- **Live Movie Search:** Fetches real-time movie data seamlessly from the OMDb API.
- **Detailed Movie Views:** Displays genres, plot summaries, runtime, directors, and actors for selected titles.
- **Custom Star Rating Component:** A highly reusable UI component built to capture user ratings.
- **Personal Watchlist Management:** Add, track, or delete movies from your custom "Watched" list.
- **Dynamic Stats:** Automatically calculates your personal average user rating, IMDb score, and total runtime for watched movies.
- **Persistent Storage:** Uses `localStorage` to save your watchlist data so it persists across page refreshes.
- **Advanced Hook Patterns:** Implements clean `useEffect`, `useState`, and `useRef` flows to handle keyboard shortcuts (Escape key), active tab titles, and network race conditions.

---

## 🛠 Tech Stack

- **React.js** (Core Library)
- **JavaScript (ES6+)**
- **CSS3** (Custom UI/UX styling)
- **OMDb API** (External Movie Database)
- **Vercel** (Production Hosting & CI/CD Pipeline)

---

## 🚀 Local Installation & Setup

Want to run this project locally on your machine? Follow these simple steps:

1. Clone the repository:

```bash
git clone [https://github.com/SamanKalani/usepopcorn.git](https://github.com/SamanKalani/usepopcorn.git)
```

2. Navigate into the project folder:
   cd usepopcorn

3.Install the project dependencies:
npm install

4. Start the development server:
   npm start

Open your browser and head over to http://localhost:3000 to view the app!
