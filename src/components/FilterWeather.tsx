"use client"
import React, { useEffect, useState } from 'react'

const FilterWeather = ({ hourly }: { hourly: Hourly; }) => {
    const [uniqueDates, setUniqueDates] = useState<String[]>([]);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('00:00');

    const [wind, setWind] = useState<number>(0); // Assuming wind is a number
    const [humidity, setHumidity] = useState<number>(0); // Assuming humidity is a number
    const [temperature, setTemperature] = useState<number>(0); // Assuming temperature is a number

    useEffect(() => {
        if (hourly.HourlyData.time.length > 0) {
            const dates = hourly.HourlyData.time.map(dateTime => dateTime.split('T')[0]);
            const uniqueDates = Array.from(new Set(dates));
            setUniqueDates(uniqueDates);
            setSelectedDate(uniqueDates[0])
        }
    }, [])

    useEffect(() => {
        const time = `${selectedDate}T${selectedTime}`
        const index = hourly.HourlyData.time.indexOf(time);
        setWind(hourly.HourlyData.wind_speed_10m[index])
        setHumidity(hourly.HourlyData.relative_humidity_2m[index])
        setTemperature(hourly.HourlyData.temperature_2m[index])
    }, [selectedDate, selectedTime])

    return (
            <div>
                <div className='text-xl text-center'>FilterWeather</div>
                <div>
                    <span>Choose Date: </span>
                    <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                        {uniqueDates.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <span>Choose Time: </span>
                    <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                        {
                            Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`).map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <div>Wind: {wind} {hourly.HourlyUnits.wind_speed_10m}</div>
                    <div>Temperature: {temperature} {hourly.HourlyUnits.temperature_2m}</div>
                    <div>Humidity: {humidity} {hourly.HourlyUnits.relative_humidity_2m}</div>
                </div>
            </div>
    )
}

export default FilterWeather