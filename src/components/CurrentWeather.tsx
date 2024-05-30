import React from 'react'

const CurrentWeather = ({ current }: { current: Current }) => {
    return (
        <div className='flex flex-col'>
            <div className='text-xl text-center'>Current Weather</div>
            <div className=''>
                <div>
                    temperature: {current.CurrentData.temperature_2m} {current.CurrentUnits.temperature_2m}
                </div>
                <div>
                    Date: {current.CurrentData.time.split('T')[0]} 
                </div>
                <div>
                    Time: {current.CurrentData.time.split('T')[1]} 
                </div>
                <div>
                    Wind: {current.CurrentData.wind_speed_10m} {current.CurrentUnits.wind_speed_10m}
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather