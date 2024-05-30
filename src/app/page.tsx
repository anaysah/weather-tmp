"use client";
import { useEffect, useState } from "react";

const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";

async function fetchData() {
	try {
		const res = await fetch(API_URL);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		const data = await res.json();
		console.log(data);
		return data.hourly;
	} catch (error) {
		console.error(error);
	}
};

// const wheather_data = fetchData().then((data)=>data)

export default function Home() {
	const [data, setData] = useState({ time: [], temperature_2m: [], relative_humidity_2m: [], wind_speed_10m: [] });

	const [uniqueDates, setUniqueDates] = useState([]);

	const [selectedDate, setSelectedDate] = useState('');
	const [selectedTime, setSelectedTime] = useState('00:00');

	const [wind, setWind] = useState('')
	const [humidity, setHumidity] = useState('')
	const [temperature, setTemperature] = useState('')

	useEffect(() => {
		fetchData().then(setData).catch(console.error);
	}, []);

	useEffect(() => {
		console.log(data);

		if (data.time.length > 0) {
			const dates = data.time.map(dateTime => dateTime.split('T')[0]);
			const uniqueDates = Array.from(new Set(dates));
			setUniqueDates(uniqueDates);
			setSelectedDate(uniqueDates[0])
		}
	}, [data]);

	useEffect(()=>{
		const time = `${selectedDate}T${selectedTime}`
		const index = data.time.indexOf(time);
		setWind(data.wind_speed_10m[index])
		setHumidity(data.relative_humidity_2m[index])
		setTemperature(data.temperature_2m[index])
	},[selectedDate, selectedTime])

	return (
		<>
			<div className="text-xl text-center">Weather API</div>
			<div>
				<span>Choose Date: </span>
				<select value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)}>
					{uniqueDates.map((value, index) => (
						<option key={index} value={value}>{value}</option>
					))}
				</select>
			</div>
			<div>
				<span>Choose Time: </span>
				<select value={selectedTime} onChange={(e)=>setSelectedTime(e.target.value)}>
					{
						Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`).map((value, index)=>(
							<option key={index} value={value}>{value}</option>
						))
					}
				</select>
			</div>
			<div>
				<div>Wind: {wind}</div>
				<div>Temperature: {temperature}</div>
				<div>Humidity: {humidity}</div>
			</div>
		</>
	); 
}
