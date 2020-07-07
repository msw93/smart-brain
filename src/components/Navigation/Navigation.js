import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn}) => {
		//console.log('signedin', isSignedIn);
		if(isSignedIn){
			return(			
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange("signin")} className='f3 link dim black underline ma2 pa1 pointer '>Signout</p>
				</nav>
			);
		} else {
			return(			
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange("signin")} className='f3 link dim black underline pa1 ma2 pointer '>Signin</p><p>&nbsp;</p>
					<p onClick={() => onRouteChange("register")} className='f3 link dim black underline pa1 mt2 mr3 pointer '>Register</p>
				</nav>
			);
		}


}

export default Navigation;