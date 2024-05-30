"use client"
import React, { useEffect, useState } from 'react'
import InfoDisplay from './InfoDisplay';
import { DropletIcon, ThermometerIcon, WindIcon } from 'lucide-react';

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
        <div className='rounded border p-2 flex-1'>
            <div className='text-xl text-center font-bold mb-4 tracking-wider'>Filter Weather</div>
            <div>
                <span>Choose Date: </span>
                <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className='border rounded'>
                    {uniqueDates.map((value, index) => (
                        <option key={index} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div>
                <span>Choose Time: </span>
                <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className='border rounded'>
                    {
                        Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`).map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))
                    }
                </select>
            </div>
            <div className='flex gap-4 flex-wrap mt-2 mb-2'>
                <InfoDisplay
                    value={wind}
                    valueUnit={hourly.HourlyUnits.wind_speed_10m}
                    icon={<WindIcon />} // Assuming WindIcon is the icon component
                    iconColor="#bf78d9"
                    infoType="Wind"
                />

                <InfoDisplay
                    value={temperature}
                    valueUnit={hourly.HourlyUnits.temperature_2m}
                    icon={<ThermometerIcon />} // Assuming ThermometerIcon is the icon component
                    iconColor="#ff0000"
                    infoType="Temperature"
                />

                <InfoDisplay
                    value={humidity}
                    valueUnit={hourly.HourlyUnits.relative_humidity_2m}
                    icon={<DropletIcon />} // Assuming HumidityIcon is the icon component
                    iconColor="#00ff00"
                    infoType="Humidity"
                />

            </div>
        </div>
    )
}

export default FilterWeather