import React,{useState} from 'react';
import { Text, View, Image, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import {TextInput, Button}  from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const LoginScreen= ({navigation}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
    
  const userLogin = async () => {
    if(!email||!password){
        Alert.alert('please add all the fields') 
        return
    }
    try{
       const result = await auth().signInWithEmailAndPassword(email,password)
       console.log(result.user)
    }
    catch(err){
        Alert.alert('something went wrong please try with different password')
    }
  }

   return(
       <KeyboardAvoidingView  behavior='position' >
            <View  style={styles.box1} >
            <Image style={{width:200,height:200}} source={require('../assets/cnqlogo.png')}/>
            <Text style={styles.text}>please login to continue!</Text>
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
             <Button mode="contained"  onPress={() => userLogin()}>
                login
             </Button>
             <TouchableOpacity onPress={() => navigation.navigate('signup')}>
             <Text style={{textAlign: 'center'}}>Don't have an account?</Text>
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


export default LoginScreen;
