## Overview
Rouvia is a voice based maps app. Unlike a traditional GPS forces drivers to manually input their destinations. Using Rouvia feels more natural, like talking to someone which google maps open in the passenger seat who knows already knows all about you, your home, work, the gym etc.

## How it works
An optimal route is generated based on users prompt. Users can login and save locations such as Home, Work, Daycare. Audio is transcribed with OpenAI Whisper, the intents are parsed with Google Gemini, the locations are matched and scored for highest rating using Google Places API. The route distance is optimised using Google Directions API, and displayed with Mapbox 3D map.

## Tech
- Frontend: `Next.js` with `React`, and `Tailwind CSS`
- Backend and Database: `FastAPI`, `MongoDB`, `Pydantic`
- APIs: Gemini, OpenAI Whisper, Google Places & Directions APIs, Mapbox

## Challenges and Takeaways
While making this I learned that handling ambiguous human input requires careful confidence checks, fallbacks, and personal context to make the system reliable.