"use client";
import { useEffect, useState } from "react";

type WeatherData = {
    city: string;
    temperature: number;
    description: string;
    icon: string;
};

export default function Weather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await fetch("api/weather");

                if (!response.ok) {
                    throw new Error("Failed to fetch weather");
                }

                const data: WeatherData = await response.json();
                setWeather(data);
            } catch {
                setError("Unable to load weather.");
            } finally {
                setLoading(false)
            }
        }

        fetchWeather();
    }, []);

    if (loading) {
        return <p className="text-[15.86px] font-normal text-secondary-text">loading weather...</p>;
    }
    if (error || !weather) {
        return (
        <p className="text-[14px] font-normal text-secondary-text">
            {error ?? "weather unavailable."}
        </p>
        );
    }

    return (
        <div>
            <p className="text-[15.86px] font-normal text-secondary-text">it is {weather.temperature}°c in {weather.city.toLowerCase()}, {weather.description}</p>
        </div>
    );
}
