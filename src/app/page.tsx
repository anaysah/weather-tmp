import CurrentWeather from "@/components/CurrentWeather";
import FilterWeather from "@/components/FilterWeather";

const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";

async function fetchData(): Promise<AllData | undefined> {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        const Hourly = {
            HourlyData: data.hourly,
            HourlyUnits: data.hourly_units
        }

        const Position = {
            latitude: data.latitude,
            longitude: data.longitude,
            timezone: data.timezone,
        }

        const Current = {
            CurrentData: data.current,
            CurrentUnits: data.current_units
        }

        return { Hourly, Position, Current }

    } catch (error) {
        console.error(error);
    }
};

export default async function Temp() {

    const data = await fetchData()

    return (
        <>
            <div className="flex gap-3 flex-col">
                {data && <FilterWeather hourly={data?.Hourly} />}
                {data && <CurrentWeather current={data?.Current} />}
            </div>
        </>
    )
}
