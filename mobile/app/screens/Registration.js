import {ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styleSheet from '../style/stylesheet';
import { isValidObjField, isValidEmail, updateError } from '../utils/methods';
import client from '../api/client';

function generateId() {
    var random = Math.floor(Math.random() * 10000);
    var uniqueId =random;
    return uniqueId;
}

const Registration = ({navigation})=> {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('');
    const {name, email, password, confirmPassword} = userInfo;

    const handleOnChangeText = (value, fieldName) =>{
        setUserInfo({...userInfo, [fieldName]: value});
    };

    const isValidForm = () =>{
        if(!isValidObjField(userInfo))
            return updateError('REQUIRED ALL FIELDS', setError);
        if(!name.trim() || name.length<3) 
            return updateError('INVALID NAME', setError);
        if(!isValidEmail(email))
            return updateError('INVALID EMAIL', setError);
        if(!password.trim() || password.length<8) 
            return updateError('PASSWORD IS LESS THAN 8 CHARACTERS', setError);
        if(password !== confirmPassword)
            return updateError('PASSWORD DO NOT MATCH', setError);

            return true;
        }

    const submitForm = async() =>{
        if(isValidForm()){
            const userID = generateId();
        try{    
        await client.post('/addUser', {userID,
                ...userInfo,
            })
        console.log("User Added!");
        navigation.navigate("Login");
        } catch (err){
            console.log("Error: " + err);
        }
    }
    }

    return ( 
    <ScrollView style={styleSheet.container}>  
            <Text style={styleSheet.titleStyle}>
                Hello, Nice To meet you 
            </Text>
            <Text style={styleSheet.titleStyle}>
                Set Up your account 
            </Text>        
        <View>
        {error ? <Text style={{color: 'red', fontSize: 18, textAlign: 'center'} }>{error}</Text>: null}
        <Text style={styleSheet.label}>Name:</Text>

            <TextInput
            style={styleSheet.input}
            value={name} 
            onChangeText={(value) => handleOnChangeText(value, 'name')} />
        
            <Text style={styleSheet.label}>Email:</Text>
            <TextInput 
            autoCapitalize='none'
            style={styleSheet.input} 
            value={email} 
            onChangeText={(value) => handleOnChangeText(value, 'email')} />
        
            <Text style={styleSheet.label}>Password:</Text>
            <TextInput 
            autoCapitalize='none'
            style={styleSheet.input} 
            value={password} 
            onChangeText={(value) => handleOnChangeText(value, 'password')}
            secureTextEntry={true} /> 
            
            <Text style={styleSheet.label}>ConfirmPassword:</Text>
            <TextInput 
            autoCapitalize='none'
            style={styleSheet.input} 
            value={confirmPassword} 
            onChangeText={(value) => handleOnChangeText(value, 'confirmPassword')}
            secureTextEntry={true} />    
        </View>

        <View style ={styleSheet.buttonContainer}>
                <TouchableOpacity
                style={styleSheet.buttonSubmit}
                onPress={submitForm}
                >
                    <Text style={styleSheet.buttonSubmitText}>Register</Text>
                </TouchableOpacity>                
            </View>
            

         <View style ={styleSheet.buttonContainer}>
            <TouchableOpacity
            style={styleSheet.buttonSecondary}
            onPress={() => navigation.navigate("Welcome")}
            >
                <Text style={styleSheet.buttonSecondaryText}>Back</Text>
            </TouchableOpacity>           
            
        </View>
    
    </ScrollView>
    );
}
export default Registration;

