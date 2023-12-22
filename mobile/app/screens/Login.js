import { Dimensions, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styleSheet from '../style/stylesheet';
import { isValidObjField, isValidEmail, updateError } from '../utils/methods';
import client from '../api/client';

const Login = ({navigation})=> {

    const [userInfo, setUserInfo] = useState({
        Email: '',
        Pass: ''
    })    
    const [error, setError] = useState('');

    const {Email, Pass} = userInfo;
    const handleOnChangeText = (value, fieldName) =>{
        setUserInfo({...userInfo, [fieldName] : value})
    }

    const isValidForm = () =>{
        if(!isValidObjField(userInfo))
            return updateError('REQUIRED ALL FIELDS', setError)
        if(!isValidEmail(Email))
            return updateError('INVALID EMAIL', setError);
        if(!Pass.trim() || Pass.length<8) 
            return updateError('PASSWORD TOO SHORT', setError);
        return true;
    }

    const submitForm = async() => {
        if(isValidForm()){
        await client.post('/login',{
            ...userInfo
        }).then(res =>{
            if(res.data.Message === "User Not registered"){
                return updateError('USER NOT REGISTERED', setError);
            }else{
                navigation.navigate("Dashboard",
                 {state: {UserID: res.data[0].UserID,
                    Name: res.data[0].Name}})            
            }})
            .catch(err => console.log(err))
        }
    }
    return (
    <SafeAreaView style={styleSheet.container}>  
        <View style={{
            paddingHorizontal:  10}} >
            <Text style={styleSheet.titleStyle}>
                Welcome back, 
            </Text>
            <Text style={styleSheet.titleStyle}>
                Login and get Started 
            </Text>
        <View style={{marginVertical: 25}}>
        {error ? <Text style={{color: 'red', fontSize: 18, textAlign: 'center'} }>{error}</Text>: null}            

            <Text style={styleSheet.label}>Email:</Text>
            <TextInput 
            style={styleSheet.input} 
            value={Email} 
            autoCapitalize='none'
            onChangeText={value => handleOnChangeText(value, 'Email')} />
        
            <Text style={styleSheet.label}>Password:</Text>
            <TextInput 
            style={styleSheet.input} 
            value={Pass} 
            autoCapitalize='none'
            onChangeText={value => handleOnChangeText(value, 'Pass')} 
            secureTextEntry={true} />
            
        </View>
        
        </View>
        
         <View style ={styleSheet.buttonContainer}>
            <TouchableOpacity
            style={styleSheet.buttonPrimary}
            onPress={submitForm}
            >
                <Text style={styleSheet.buttonPrimaryText}>Login</Text>
            </TouchableOpacity>           
            <TouchableOpacity
            style={styleSheet.buttonSecondary}
            onPress={() => navigation.navigate("Registration")}
            >
                <Text style={styleSheet.buttonSecondaryText}>Register</Text>
            </TouchableOpacity>           

        </View>
    
    </SafeAreaView>
    );
}
export default Login;

