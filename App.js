/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import Button from 'react-native-button';

import {validate} from './ios/validation';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Input,
  View,
  Dimensions,
  AlertIOS,
  AppRegistry,
} from 'react-native';


export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
    
      inputEmail:null,
      inputEmailError:false,
      inputEmailErrorMessage:'',
 
      inputPassword:null,
      inputPasswordError:false,
      inputPasswordErrorMessage:'',

      passwordConfirm:null,
      passwordConfirmError:false,
      passwordConfirmErrorMessage:'',

      inputName:null,
      inputNameError:null,
      inputNameErrorMessage:''
  };
      
 }
   _getPassword(){
      let valuePS=this.state.inputPassword;
   } 
  
   _onPressButton(){
    
      let emailValue=this.state.inputEmail;
      let passwordValue=this.state.inputPassword;
      let nameValue=this.state.inputName;
     console.log(emailValue);
     console.log(passwordValue);
     console.log(nameValue);
    
     fetch('https://jsonplaceholder.typicode.com/users', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
          body: JSON.stringify({

           email: emailValue,
           password:passwordValue,
           name: nameValue,
        })
      }).then((response) => {console.log('response:',response.status);
                               var responseValue=response.status;
                              if(responseValue==201){
                                 console.log("create successfully")
                              }else{
                                console.log("Something Wrong")}
                             
                            })
        .catch((error)=>{
           console.log("Api call error");
           alert(error.message);
          }
        );
         
    }
    

  render() {
     let passwordValue=this.state.inputPassword;
    return (
      <View style={styles.container}> 
              
         <View style={styles.toolbar}>     
                <Text style={styles.toolbarTitle}>Signup</Text>
         </View>


         <TextInput 
          style={[styles.text, this.state.inputEmailError?styles.error:null]}
          placeholder="Email" 
          onChangeText={(inputEmail)=>{

            this.setState({inputEmail:inputEmail});
            let v = validate('email',inputEmail);
            this.setState({inputEmailError:!v[0],inputEmailErrorMessage:v[1]})
          }
          }
          /> 
          <Text style={styles.error}>
          {this.state.inputEmailErrorMessage}
          </Text>    

         <TextInput 
         style={[styles.text,this.state.inputPasswordError?styles.error:null]}
         placeholder="Password" 
         onChangeText={(inputPassword)=>{
            this.setState({inputPassword:inputPassword});
            let p = validate('password',inputPassword);
            this.setState({inputPasswordError:!p[0],inputPasswordErrorMessage:p[1]})
          }}
         />

         <Text style={styles.error}>
          {this.state.inputPasswordErrorMessage}
          </Text> 

         <TextInput 
         style={[styles.text,this.state.passwordConfirmError?styles.error:null]}
         placeholder="Password Confirmation" 
         
         onChangeText={(passwordConfirm)=>{
           
            this.setState({passwordConfirm:passwordConfirm});
              console.log(passwordValue);
              if(passwordConfirm == passwordValue){
               this.setState({passwordConfirmError:false,passwordConfirmErrorMessage:''})
              }else{
                this.setState({passwordConfirmError:true,passwordConfirmErrorMessage:'please enter same password as above'})
              }
          }
          }
         />
         <Text style={styles.error}>
          {this.state.passwordConfirmErrorMessage}
          </Text>

          <TextInput 

           placeholder="Name" 
           style={[styles.text,this.state. inputNameError?styles.error:null]}
            onChangeText={( inputName)=>{
              this.setState({ inputName: inputName});
              let v = validate('name', inputName);
              this.setState({ inputNameError:!v[0], inputNameErrorMessage:v[1]})
         
           }}
          />
          <Text style={styles.error}>
          {this.state. inputNameErrorMessage}
          </Text>


        <Button style={styles.buttons}
          onPress={() => this._onPressButton()}>
         Sign Up
        </Button>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbarTitle:{
        fontSize: 20, 
        color:'#000000',
        textAlign:'center',
        fontWeight:'bold',
        flex:1              
    },
    toolbar:{
       
        paddingTop:50,
        paddingBottom:30,
        flexDirection:'row'    
    },
 
  text: {
    margin: 10,
    paddingBottom:5,
    paddingTop:5,
    fontSize: 20,
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 2
},
 
 buttons:{
    fontSize: 20, 
    color: '#ffffff',
    backgroundColor:'#cc0000',
    borderColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
    paddingBottom:10, 
    paddingTop:10,
    width: 180,  
    textAlign:'center',  
    alignSelf: 'center'
 },
 error:{ 
    margin: 20,
    fontSize: 10,
    paddingBottom:1, 
    paddingTop:1,
    color:'#cc0000',
    borderBottomColor: '#cc0000',
 },
  
});

AppRegistry.registerComponent('App', () => App);