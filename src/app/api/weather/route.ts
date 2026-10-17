import { NextResponse } from "next/server";

const LOCATIONS = {
    waterloo: {
        name: "Waterloo",
        lat: 43.4643,
        lon: -80.5204,
    },
    toronto: {
        name: "Toronto",
        lat: 43.6532,
        lon: -79.3832,
    },
    beijing: {
        name: "Beijing",
        lat: 39.9042,
        lon: 116.4074,
    },
    kiruna: {
        name: "Kiruna",
        lat: 67.8558,
        lon: 20.2253,
    }, 
} as const;

const ACTIVE_LOCATION = "waterloo";
const location = LOCATIONS[ACTIVE_LOCATION];

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing API key" },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://api.openweathermap.org/data/2.5/weather"
  );

  url.searchParams.set("lat", String(location.lat));
  url.searchParams.set("lon", String(location.lon));
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");

  const response = await fetch(url);

  if (!response.ok) {
    return NextResponse.json(
      { error: "OpenWeatherMap request failed" },
      { status: response.status }
    );
  }

  const data = await response.json();

  return NextResponse.json({
    city: location.name,
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
  });
}
