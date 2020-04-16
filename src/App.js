import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import FaceRecognition from './components/FaceRec/FaceRec.js'
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import ParticleOptions from './components/ParticleOptions/ParticleOptions.js'

const app = new Clarifai.App({
 apiKey: '7840b954efde43598f79269f4d7bbebf'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height, clarifaiFace);
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      botRow: height - (clarifaiFace.bottom_row * height),
      rightCol: width - (clarifaiFace.right_col * width)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
    //console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
        .then(response =>  this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log('this is your error',err));
          //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route}) 
  }

  Test = () => {
    console.log('current route is', this.state.route);
  }



  render(){
    const {isSignedIn, imageURL, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={ParticleOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' 
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>
              
            <FaceRecognition box={box} imageURL={imageURL}/>
           </div>
          :(  
              this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange}/> 
              : <Register onRouteChange={this.onRouteChange}/>
           )
        }
        </div>
    );
  }
}

export default App;
