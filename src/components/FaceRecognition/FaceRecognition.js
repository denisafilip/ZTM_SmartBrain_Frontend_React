import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='center ma'>
            <div className='m-5 relative mt2'>
                <img id="input-image" className="h-auto max-w-xl rounded-lg" src={imageUrl} alt="face detection"/>
                {boxes.map(box =>
                    <div key={`box${box.topRow}${box.rightCol}`}
                         className='bounding-box'
                         style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FaceRecognition;