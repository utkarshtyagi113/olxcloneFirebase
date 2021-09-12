import React, {useState} from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const CreateAdScreen = () => {
    const[name,setName] = useState('')
    const[desc,setDesc] = useState('')
    const[year,setYear] = useState('')
    const[price,setPrice] = useState('')
    const[phone,setPhone] = useState('')
    const[image,setImage] = useState("")
    const sendNoti = () => {
        firestore().collection('usertoken').get().then(querySnap=>{
            const userDeviceToken = querySnap.docs.map(docSnap=>{
                return docSnap.data().token
            })
            console.log(userDeviceToken)
            fetch('https://7696af165ebe.ngrok.io/send-noti',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
            })     
        })
    }
    
    const postData = async () => {
        try{
            await firestore().collection('ads')
            .add({
                name,
                desc,
                year,
                price,
                phone,
                image,
                uid: auth().currentUser.uid,
            })    
            Alert.alert('posted your ad!')
        }catch(err){
            Alert.alert('Something went wrong. Try again')
        }
     }

    const openCamera = () => {
        launchImageLibrary({quality:0.5},(fileobj)=>{
            console.log(fileobj.assets[0].uri)
            const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.assets[0].uri)
            uploadTask.on('state_changed', 
            (snapshot) => {
               
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 if(progress==100){alert("uploaded")}
            }, 
            (error) => {
               alert("something went wrong")
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                   
                    setImage(downloadURL)
                });
            }
            );
           })
    }    
    
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Create Ad!</Text>
             <TextInput  
              label='Ad title'
              value={name}
              mode= 'outlined'
              onChangeText={text => setName(text)}
             />

             <TextInput  
              label='Description for what you are selling'
              value={desc}
              mode= 'outlined'
              numberOfLines= {3}
              multiline={true}
              onChangeText={text => setDesc(text)}
             />

              
             <TextInput  
              label='Year of the purchase'
              value={year}
              mode= 'outlined'
              keyboardType= 'numeric'
              onChangeText={text => setYear(text)}
             />

             <TextInput  
              label='Price in INR'
              value={price}
              mode= 'outlined'
              keyboardType= 'numeric'
              onChangeText={text => setPrice(text)}
             />


             <TextInput  
              label='Your contact Number'
              value={phone}
              mode= 'outlined'
              keyboardType='numeric'
              onChangeText={text => setPhone(text)}
             />
             <Button icon="camera" mode="contained" onPress={() => sendNoti()}>
                Test notification
             </Button>
             <Button icon="camera" mode="contained" onPress={() => openCamera()}>
                Upload Image
             </Button>
             <Button disabled={image?false:true}  mode="contained" onPress={() => postData()}>
                 Post
             </Button>
        </View>
    )
}


const styles=StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: 'space-evenly'
    },

    text: {
        fontSize: 22,
        textAlign: 'center'
    }
});



export default CreateAdScreen;