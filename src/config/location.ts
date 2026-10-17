type Location = {
  name: string;
  lat: number;
  lon: number;
  timeZone: string;
};

const LOCATIONS = {
  waterloo: {
    name: "Waterloo",
    lat: 43.4643,
    lon: -80.5204,
    timeZone: "America/Toronto",
  },
  toronto: {
    name: "Toronto",
    lat: 43.6532,
    lon: -79.3832,
    timeZone: "America/Toronto",
  },
  beijing: {
    name: "Beijing",
    lat: 39.9042,
    lon: 116.4074,
    timeZone: "Asia/Shanghai",
  },
  kiruna: {
    name: "Kiruna",
    lat: 67.8558,
    lon: 20.2253,
    timeZone: "Europe/Stockholm",
  },
} satisfies Record<string, Location>;

const ACTIVE_LOCATION: keyof typeof LOCATIONS = "waterloo";

export const location: Location = LOCATIONS[ACTIVE_LOCATION];
