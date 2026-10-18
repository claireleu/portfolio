"use client";
import { useEffect, useState } from "react";
import { location } from "../config/location";
import ScrambleText from "./ScrambleText";

const REFRESH_MS = 30 * 60 * 1000;

const PERIODS = [
  { start: "00:00:00", label: "early morning" },
  { start: "05:00:00", label: "morning" },
  { start: "12:00:00", label: "afternoon" },
  { start: "17:00:00", label: "evening" },
  { start: "21:00:00", label: "night" },
] as const;

type WeatherData = {
  description: string;
};

const ADJECTIVES: Record<string, string> = {
  "thunderstorm with light rain": "stormy",
  "thunderstorm with rain": "stormy",
  "thunderstorm with heavy rain": "stormy",
  "light thunderstorm": "stormy",
  "thunderstorm": "stormy",
  "heavy thunderstorm": "stormy",
  "ragged thunderstorm": "stormy",
  "thunderstorm with light drizzle": "stormy",
  "thunderstorm with drizzle": "stormy",
  "thunderstorm with heavy drizzle": "stormy",
  "light intensity drizzle": "drizzly",
  "drizzle": "drizzly",
  "heavy intensity drizzle": "drizzly",
  "light intensity drizzle rain": "drizzly",
  "drizzle rain": "drizzly",
  "heavy intensity drizzle rain": "drizzly",
  "shower rain and drizzle": "drizzly",
  "heavy shower rain and drizzle": "drizzly",
  "shower drizzle": "drizzly",
  "light rain": "drizzly",
  "moderate rain": "rainy",
  "heavy intensity rain": "pouring",
  "very heavy rain": "pouring",
  "extreme rain": "pouring",
  "freezing rain": "icy",
  "light intensity shower rain": "showery",
  "shower rain": "showery",
  "heavy intensity shower rain": "pouring",
  "ragged shower rain": "showery",
  "light snow": "snowy",
  "snow": "snowy",
  "heavy snow": "snowy",
  "sleet": "sleety",
  "light shower sleet": "sleety",
  "shower sleet": "sleety",
  "light rain and snow": "slushy",
  "rain and snow": "slushy",
  "light shower snow": "snowy",
  "shower snow": "snowy",
  "heavy shower snow": "snowy",
  "mist": "misty",
  "smoke": "smoky",
  "haze": "hazy",
  "sand/dust whirls": "dusty",
  "fog": "foggy",
  "sand": "sandy",
  "dust": "dusty",
  "volcanic ash": "ashy",
  "squalls": "windy",
  "tornado": "very windy",
  "clear sky": "clear",
  "few clouds": "mostly clear",
  "scattered clouds": "partly cloudy",
  "broken clouds": "cloudy",
  "overcast clouds": "overcast",
};

function periodAt(time: string) {
  return PERIODS.findLast(({ start }) => start <= time)!.label;
}

const place = location.name.toLowerCase();

function usePeriod() {
  const { timeZone } = location;
  const [period, setPeriod] = useState<string | null>(null);

  useEffect(() => {
    function updatePeriod() {
      const time = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }).format(new Date());
      setPeriod(periodAt(time));
    }

    updatePeriod();

    const intervalId = setInterval(updatePeriod, REFRESH_MS);

    return () => clearInterval(intervalId);
  }, [timeZone]);

  return period;
}

function useWeather() {
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch("/api/weather");

        if (!response.ok) {
          throw new Error("Failed to fetch weather");
        }

        const data: WeatherData = await response.json();
        setWeather(ADJECTIVES[data.description] ?? data.description);
      } catch {
        setWeather("");
      }
    }

    fetchWeather();
  }, []);

  return weather;
}

const article = (word: string) => (/^[aeiou]/.test(word) ? "an" : "a");

export default function LocationDescription() {
  const weather = useWeather();
  const period = usePeriod();
  const scene = weather ? `${article(weather)} ${weather} ${period}` : period;
  const description = weather !== null && period && `~ it’s ${scene} in ${place}. claire is at school this fall.`;

  return (
    <div className="min-h-lh">
      <ScrambleText
        cycle_per_letter={1}
        shuffle_time={25}
        placeholder={`~ it’s a sunny afternoon in ${place}. claire is at school this fall.`}
      >
        {description || null}
      </ScrambleText>
    </div>
  );
}
