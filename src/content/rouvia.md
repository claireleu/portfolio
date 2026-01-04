## Overview
Rouvia is a voice based maps app. Unlike a traditional GPS forces drivers to manually input their destinations. We wanted to make navigation more natural like talking to someone which google maps open in the passenger seat who knows already knows all about you, your home, work, the gym etc.

## How it works
Audio is transcribed with OpenAI Whisper, the intents are parsed with Google Gemini, and the locations are matched and scored for rating + popularity using Google Places API, and routes are optimized and displayed via Mapbox. Along the way, we learned that handling ambiguous human input requires careful confidence checks, fallbacks, and personal context to make the system reliable.