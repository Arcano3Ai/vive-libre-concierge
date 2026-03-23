# Vive Libre Project Context

Vive Libre Travel Club is a sophisticated concierge service and travel club specializing in luxury villa rentals and personalized guest experiences.

## Project Overview

- **Purpose:** Provide a seamless, AI-driven concierge experience (The Butler) for guests interested in luxury villas (Blue Bird, The Owl, The Hummingbird, The Eagle, and The Parrot).
- **Main Technologies:**
  - **Runtime:** Node.js
  - **Frontend:** Vite, React (implied by file structure/package.json), Vanilla CSS.
  - **Backend:** Express.js (v5.2.1)
  - **AI Integration:** Google Generative AI (@google/generative-ai) using Gemini 1.5 Flash.
  - **Maps:** Leaflet.js
- **Architecture:**
  - `server.js`: Express server handling API requests and serving static files.
  - `index.html`: Main entry point for the web application.
  - `js/`: Client-side JavaScript logic.
  - `css/`: Styling for the application.
  - `assets/`: Static assets like images.
  - `vive-concierge-widget.js`: The "Butler" chat widget integration.

## Key Data

- **Villas:**
  - **Pájaro Azul ($3,100):** Zenithal window for stargazing.
  - **El Búho ($3,900):** African-inspired decor.
  - **El Colibrí ($3,900):** Modern with Jacuzzi.
  - **El Águila ($3,900):** Alpine, romantic style.
  - **La Cotorra ($16,500):** Infinity pool, accommodates groups of 6.
- **Booking:** Directs users to WhatsApp (https://wa.me/528121912778) for final reservation.

## AI Character: The Butler (Mayordomo Principal)
- **Personality:** Sophisticated, masculine, polite, serene, and distinguished.
- **Tone:** Formal (uses 'Usted').
- **Constraint:** Brief responses (max 3 sentences).

## Development Commands

- **Start Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Start Backend:** `npm run server`
- **Format Code:** `npm run format`
- **Lint Code:** `npm run lint`

## Integration Goals (In Progress)
- Enhancing the "Butler" with multimodal capabilities from Gemini 1.5.
- Integrating real-time features inspired by the Gemini Multimodal Live API.
- Utilizing the Gemini CLI for automated codebase management and deployment.
