import React,{useState} from 'react';
import { Text, View, Image, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import {TextInput, Button}  from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

const SignupScreen= ({navigation}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const userSignup = async () => {
    if(!email||!password){
        Alert.alert('please add all the fields') 
        return
    }
    try{
        await auth().createUserWithEmailAndPassword(email,password)
        messaging().getToken().then(token=>{
            firestore().collection('usertoken').add({
               token:token
            })
        })
    }
    catch(err){
        Alert.alert('something went wrong please try with different password')
    }
  }
    return(
       <KeyboardAvoidingView  behavior='position' >
            <View  style={styles.box1} >
            <Image style={{width:200,height:200}} source={require('../assets/cnqlogo.png')}/>
            <Text style={styles.text}>Please Signup!</Text>
          <View style={styles.box2}>  
             
             <TextInput  
              label='Email'
              value={email}
              mode= 'outlined'
              onChangeText={text => setEmail(text)}
             />

              <TextInput  
              label='Password'
              value={password}
              mode= 'outlined'
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
             />
             <Button mode="contained"  onPress={() => userSignup() }>
                Signup
             </Button>
             <TouchableOpacity onPress={() => navigation.goBack()}>
             <Text style={{textAlign: 'center'}}>Login?</Text>
             </TouchableOpacity>
          </View>  
          </View>
       </KeyboardAvoidingView>
    )
}


const styles=StyleSheet.create({
    box1: {
        alignItems: 'center',
    },
 
    text: {
        fontSize: 22,
    },

    box2: {
      padding: 10,
      width: Dimensions.get('window').width ,
      height: '50%',
      justifyContent: 'space-evenly'
    }

});


export default SignupScreen;
