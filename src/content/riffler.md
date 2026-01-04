## Overview
My teammates and I wanted to make something fun for Hack Canada 2025. As music lovers, we thought it would be cool to make a guitar that could play *O Canada*, so we built **The Riffler**, an Arduino-powered self playing guitar.

This was my first hackathon and my first time working with hardware. I genuinely had a lot of fun making this project with my teamates and am very excited to explore more hardware based projects in the future.

## Tech
- Users upload `.gp5` guitar tablature files
- Files are parsed using the `pyguitarpro` library to extract string number, fret number, and note start times  
- The extracted data is stored in a custom JSON structure
- Data is sent in real time using `pyserial` to an Arduino Mega
- The Arduino controls servo motors that press frets and strum the guitar reading real time signals

## Hardware
The hardware is built using:
- A popsicle stick frame
- Servo motors
- Custom constructed guitar picks
- 3D printed linear actuators
- A standard guitar base

## Challenges
One of the biggest challenges we ran into was recreating the plucking motion, and string tension of strumming a note on the guitar. We spent a lot of time troubleshooting the centering of the servos, material of the picks, and strength of the frame. With many string/fret combinations to cover and limited space on the guitar, we also had to find a way to stack servos on top of eachother securely. Another challenge was converting rotational motion of servose to linear motion of pressing frets. To do this we 3D printed linear actuators. With the limited time and material it was difficult to assure consistent performance and there was a lot of trial and error, and last minute fixes. This project showed me how much of an impact good design makes on consistency and accuracy of a systems performance.  
