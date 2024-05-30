import { CalendarIcon, ClockIcon, ThermometerIcon, Wind } from 'lucide-react'
import React from 'react'
import InfoDisplay from './InfoDisplay'

const CurrentWeather = ({ current }: { current: Current }) => {
    return (
        <div className='rounded border p-2 flex-1'>
            <div className='text-xl text-center font-bold mb-4 tracking-wider'>Current Weather</div>
            <div className='flex gap-4 flex-wrap'>
                <InfoDisplay
                    value={current.CurrentData.temperature_2m}
                    valueUnit={current.CurrentUnits.temperature_2m}
                    icon={<ThermometerIcon />} // Assuming ThermometerIcon is the icon component
                    iconColor="#ff0000"
                    infoType="Temperature"
                />

                <InfoDisplay
                    value={current.CurrentData.time.split('T')[0]}
                    valueUnit=""
                    icon={<CalendarIcon />} // Assuming CalendarIcon is the icon component
                    iconColor="#0000ff"
                    infoType="Date"
                />

                <InfoDisplay
                    value={current.CurrentData.time.split('T')[1]}
                    valueUnit=""
                    icon={<ClockIcon />} // Assuming ClockIcon is the icon component
                    iconColor="#000000"
                    infoType="Time"
                />
                {/* <div className='flex gap-3'>
                    <Wind color="#bf78d9" />

                    <span className='font-bold text-sky-400/100'>
                        Wind:
                    </span>
                    <span>
                        {current.CurrentData.wind_speed_10m} {current.CurrentUnits.wind_speed_10m}
                    </span>

                </div> */}

                <InfoDisplay
                    value={current.CurrentData.wind_speed_10m}
                    valueUnit={current.CurrentUnits.wind_speed_10m}
                    icon={<Wind />} // Assuming Wind is the icon component
                    iconColor="#bf78d9"
                    infoType="Wind"
                />

            </div>
        </div>
    )
}

export default CurrentWeather