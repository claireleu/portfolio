## Overview
Slang is the core of digital culture, but being well-versed also comes with requirements of demographic and screen-time not everyone can meet. Duoslango bridges the communication between generations, and give people a tool to conserve screen time while staying up to date on slang and micro conventions (based on Duolingo).

## What it does
Users can answer many question formats inclusing multiple choice, image to text matching, and fill in the blank. Each question targets one piece of internet vocabulary. Players receive instant feedback on their answers and track progress through a 3 lives system.

## Tech
- Gemini 2.0-Flash to generate creative and contextually meaningful questions
- `Flask` backend
- `React Context` for gamestate and progress tracking across multiple components
- Responsive styling with `Tailwind CSS`

## Challenges and Takeaways
This was my first time working with React Hooks and Context so it took some time to figure out how different game components behaved together. It also took a while to create the different question styles, which required generating and storing data in different forms. This was my first time learning how to use schemas for data organisation.