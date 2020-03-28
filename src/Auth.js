import React, { Component } from "react";
var firebase = require("firebase");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBmo0Fh8qMlTN96h2uicW_AJF-_OymT-o8",
    authDomain: "isurvey-acaa8.firebaseapp.com",
    databaseURL: "https://isurvey-acaa8.firebaseio.com",
    projectId: "isurvey-acaa8",
    storageBucket: "isurvey-acaa8.appspot.com",
    messagingSenderId: "559451356113",
    appId: "1:559451356113:web:3813f185647ffbc68cfef0",
    measurementId: "G-XER1BQEQTE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

class Auth extends Component {

    login(event) {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password)

        const auth = firebase.auth();
        
        const promise = auth.signInWithEmailAndPassword(email, password);

        promise.then(user => {
            let lout = document.getElementById('logout')
            //Write a welcome message for user

            lout.classList.remove('hide')
        })

        promise.catch(e => {
            let err = e.message;
            console.log(err);
            this.setState({err: err})
            
        })
    }
    
    signup(){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password);
    
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, password);
    
        promise
        .then(user => {
          var err = "Welcome "+ user.user.email;
          firebase.database().ref('users/'+user.user.uid).set({
            email: user.user.email
          });
          console.log(user);
          this.setState({err: err});       
        });
        promise
        .catch(e => {
          var err = e.message;
          console.log(err);
          this.setState({err: err});
        });
      }

    logout() {
         firebase.auth().signOut();
         let lout = document.getElementById('logout')

         //write a logout message 
         lout.classList.add('hide')
      }

     //try google sign in with the redirect 
    
    google() {
      console.log('signed in with google');

      let provider = new firebase.auth.GithubAuthProvider();
      let promise =  firebase.auth().signInWithPopup(provider);
      
      promise.then( result => {
        let user = result.user;
        console.log(result);
        firebase.database().ref('users/'+user.user.uid).set({ 
          email: user.user.email,
          name: user.user.displayName
        }) 
      })
      promise.catch(e => {
        let mssg =  e.message
        console.log(mssg);
       //to do: change state
      })
    }

    constructor(props) {
        super(props)

        this.state = {
            err: ''
        };
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.logout = this.logout.bind(this)
        this.google = this.google.bind(this)
    }
  render() {
    return (
      <div>
        <input id="email" ref="email" type="email" placeholder="enter email" />
        <br />
        <input
          id="pass"
          ref="password"
          type="password"
          placeholder="enter password"
        />
        <br />
        
        <p>{this.state.err}</p>

        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id="logout" className="hide">Log out</button><br />
        <button onClick={this.google} id="google" className="google">Sign In with Google</button>
      </div>
    );
  }
}

export default Auth;
