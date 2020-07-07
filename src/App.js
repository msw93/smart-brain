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
import ParticleOptions from './components/ParticleOptions/ParticleOptions.js'



const initialState = {
  input: '',
  imageURL:'',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id:'',
    name: '',
    email: '',
    password: '',
    entries: '',
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState; 
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

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

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
    //console.log(event.target.value);
  }

  // const myInit = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   mode: 'cors',
  //   cache: 'default'
  // };

  onButtonSubmit = () => {
    //console.log(this.state.user.id);
    this.setState({imageURL: this.state.input});
        fetch('https://intense-shelf-14948.herokuapp.com/imageurl', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input:this.state.input
          })
        })
        .then(response => response.json())
        .then(response =>  {
          //console.log(response);
          if(response){
            fetch('https://intense-shelf-14948.herokuapp.com/image', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id:this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(err => console.log(err))
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log('this is your error',err));
          //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  }

  onRouteChange = (route) => {
    if(route === 'signin'){
      this.setState(initialState)
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
    const {name, entries} = this.state.user;
    return (
      <div className="App">
        <Particles className='particles'
          params={ParticleOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' 
          ? <div>
            <Logo />
            <Rank name={name} entries={entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>
              
            <FaceRecognition box={box} imageURL={imageURL}/>
           </div>
          :(  
              this.state.route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
           )
        }
        </div>
    );
  }
}

export default App;
