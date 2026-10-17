import { NextResponse } from "next/server";
import { location } from "../../../config/location";

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
    description: data.weather[0].description,
  });
}
