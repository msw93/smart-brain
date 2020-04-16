import React from 'react';
import './FaceRec.css';

const FaceRec = ({ imageURL, box }) => {
	return (
		<div className='center ma'>
			<div className="absolute mt2">
				<img id='inputImage' src={imageURL} alt='' width='500px' height='auto'/>
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.botRow}}></div>
			</div>
		</div>

	);
}

export default FaceRec;

