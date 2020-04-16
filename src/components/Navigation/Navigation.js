import React from 'react';

// const shiet = () => {
// 	return console.log("SHIEET") 
// }

const Navigation = ({ onRouteChange, isSignedIn}) => {
		console.log('signedin', isSignedIn);
		if(isSignedIn){
			return(			
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange("signout")} className='f3 link dim black underline pa3 pointer '>Signout</p>
				</nav>
			);
		} else {
			return(			
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange("signin")} className='f3 link dim black underline pa3 pointer '>Signin</p>
					<p onClick={() => onRouteChange("register")} className='f3 link dim black underline pa3 pointer '>Register</p>
				</nav>
			);
		}


}

export default Navigation;