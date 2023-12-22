import { Dimensions, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styleSheet from '../style/stylesheet';

const {height} = Dimensions.get("window");

const WelcomeScreen = ({navigation})=> {
  return (
    <SafeAreaView style={styleSheet.container}>
      <View>
        <ImageBackground style={{
          height: height/2.5
        }}
          resizeMode='contain'
        source={require("../assets/WelcomeImg.jpeg")}
         /> 
         <View
          style={{
            paddingHorizontal:  25,
            paddingTop:25
          }}
         >
          <Text
            style={styleSheet.titleStyle}
            >
            Discover The world one adventure at a time
          </Text>
          <Text style={[styleSheet.textStyle,{marginVertical: 20}]}> 
            Begin your journey of exploration and adventure with one plane ticket at a time
          </Text>
         </View>
         <View style ={styleSheet.buttonContainer}>
            <TouchableOpacity
              style={styleSheet.buttonPrimary}
              onPress={() => navigation.navigate("Login")}
              >
              <Text style={styleSheet.buttonPrimaryText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styleSheet.buttonSecondary}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text
              style={styleSheet.buttonSecondaryText}>Register</Text>
            </TouchableOpacity>
         </View>
      </View>
    </SafeAreaView>
    );
}
export default WelcomeScreen;

