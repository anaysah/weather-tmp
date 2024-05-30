type HourlyData = {
    relative_humidity_2m: number[];
    temperature_2m: number[];
    time: string[];
    wind_speed_10m: number[];
};

type HourlyUnits = {
    relative_humidity_2m: string;
    temperature_2m: string;
    time: string;
    wind_speed_10m: string;
};

type CurrentData = {
    interval: number;
    temperature_2m: number;
    time: string;
    wind_speed_10m: number;
};

type CurrentUnits = {
    interval: string;
    temperature_2m: string;
    time: string;
    wind_speed_10m: string;
};

type Hourly = {
    HourlyData: HourlyData;
    HourlyUnits: HourlyUnits;
}

type Position = {
    latitude: number;
    longitude: number;
    timezone: string;
    // timezone_abbreviation: string;
};

type Current = {
    CurrentData: CurrentData;
    CurrentUnits: CurrentUnits;
}

type AllData = {
    Hourly:Hourly;
    Current:Current;
    Position:Position;
}