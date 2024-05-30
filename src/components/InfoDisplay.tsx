import React from 'react';

type Props = {
    value: string | number;
    valueUnit: string;
    icon: React.ReactNode; // Icon component as a ReactNode
    iconColor: string;
    infoType: string;
};

const InfoDisplay: React.FC<Props> = ({ value, valueUnit, icon, iconColor, infoType }) => {
    return (
        <div className='flex gap-2'>
            {icon && React.cloneElement(icon as React.ReactElement, { color: iconColor })} {/* Render the icon component with the specified color */}
            <span className='font-bold text-sky-400/100'>{infoType}:</span>
            <span>{value} {valueUnit}</span>
        </div>
    );
};

export default InfoDisplay;
