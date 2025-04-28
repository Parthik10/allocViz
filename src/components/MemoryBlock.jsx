// To display individual memory blocks

import React from 'react';

function MemoryBlock({ size, isFree, allocatedSize }) {
    return (
        <div
            className={`border ${isFree ? 'bg-light' : 'bg-primary'} text-white`}
            style={{
                height: '50px',
                width: `${size}px`,
                display: 'inline-block',
                margin: '2px',
                textAlign: 'center',
                lineHeight: '50px',
                fontSize: '14px'
            }}
        >
            {isFree ? "Free" : `${allocatedSize} KB`}
        </div>
    );
}

export default MemoryBlock;
