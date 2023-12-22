import React, { useState, useEffect, useRef } from "react";
import styleSheet from "../style/stylesheet";
import { ScrollView, TextInput, View , Text, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import client from "../api/client";
import { isValidObjField, updateError, getDistance } from "../utils/methods";
import TicketDesc from "../components/Ticket";
import CountryDesc from "../components/Country";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';


const Dashboard = ({navigation}) =>{


    useEffect(() =>{
        const getNotificationPermission = async () =>{
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            if(existingStatus !== 'granted'){
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== 'granted'){
                    alert('Hey! You might need to enable notifications for our app :)');
                }
            }
        };
        getNotificationPermission();
    }, [])

    useEffect(() =>{
        const subscription = Notifications.addNotificationReceivedListener((notification)=>{
            console.log(notification);
        });
        return() =>{
            subscription.remove();
        };
    }, [])

    const route = useRoute();
    const { UserID, Name} = route.params?.state || {};

    const [valuesIn, setValuesIn] = useState({
        CountryFROM: "",
        CountryTo: "",
        NumDays: "",
        numPass: ""
    }); 
    const {CountryFROM, CountryTo, NumDays, numPass} = valuesIn;

    const [error, setError] = useState('');
    
    const [countryPicker, setCountryPicker] = useState([]);
    useEffect(()=>{
            fetch('http://172.16.184.142:8082/getCountries')
            .then(res => res.json())
            .then(countryPicker =>{setCountryPicker(countryPicker)})
            .catch(err=>console.log('Error: '+ err))
        });


    function countryDetails(countryName){
        const country = countryPicker.find(country => country.Country === countryName);
    
        let countryData = {
            countryName: country.Country,
            capital: country.city,
            Longitude: country.Longitude,
            latitude: country.latitude,
        }
        return countryData;
    }
    const [tickets, setTickets] = useState([]);
    useEffect(()=>{
        fetch('http://172.16.184.142:8082/getReservation/'+ UserID)
        .then(res=>res.json())

        .then(tickets=> setTickets(tickets))
        .catch(err=>console.log("Error: "+ err))
    }, [])

    const handleOnChangeText = (value, fieldName) =>{
        setValuesIn({ ...valuesIn, [fieldName]: value });
    };

    const isValidForm = () =>{
        if(!isValidObjField(valuesIn))
            return updateError('REQUIRED ALL FIELDS', setError);
        if(NumDays < 1 || numPass < 1)
            return updateError('NUMBER OF DAYS AND PASSANGERS CANNOT BE NEGATIVE', setError);
        return true;
    }

    const handleDelete = (ticketId) => {
        const updatedTickets = tickets.filter(tickets => tickets.travelID !== ticketId);
        try{
            client.delete('/deleteTicket/'+ticketId)
        }
        catch(err){
            console.log(err);
        }
        console.log(`Deleting ticket with ID: ${ticketId}`);
        setTickets(updatedTickets);
    };



    const submitForm = async() => {
        if(isValidForm()){
 
            let CountryFromData = countryDetails(CountryFROM);
            let coordsFrom = [CountryFromData.Longitude, CountryFromData.latitude];
            
            let CountryToData = countryDetails(CountryTo);
            let coordsTo = [CountryToData.Longitude, CountryToData.latitude];
            
            let distance = getDistance(coordsFrom, coordsTo);
            let Price = parseInt(distance/100) * (NumDays * numPass);
            let travelID = tickets.length+1;

            const newTicket ={
                travelID: travelID,
                UserID: UserID,
                CountryFROM: CountryFROM,
                CountryTo: CountryTo,
                distance: distance,
                NumDays: NumDays,
                numPass: numPass,
                Price: Price 
            }
            client.post('/addTicket', {travelID, UserID, CountryFROM, CountryTo, distance, NumDays, numPass, Price})
            .then(console.log('Ticket Made'))
            .catch (err=>console.log("Error: " + err));
            setTickets([...tickets,newTicket]);
            setValuesIn({
                CountryFROM: "",
                CountryTo: "",
                NumDays: "",
                numPass: ""
            });
            await Notifications.scheduleNotificationAsync({
                content:{
                    title: 'Ticket Added',
                    body: 'Your Ticket is added',
                },
                trigger: null
            });
            setError('');
        }
    }


    return (
        <ScrollView style={{paddingHorizontal: 10, paddingVertical:15}}>

            <Text style={styleSheet.titleStyle}>Hello {Name}</Text>
            
            <Text style={styleSheet.label}>Country From:</Text>
            <RNPickerSelect 
            value={CountryFROM}
            onValueChange={(value) =>handleOnChangeText(value, 'CountryFROM')}
            items={countryPicker.map((country, index) => ({
                label: country.Country,
                value: country.Country,
                key: index.toString(),
            }))}
            />


            <Text style={styleSheet.label}>Country To:</Text>
            <RNPickerSelect 
            value={CountryTo}
            onValueChange={(value) =>handleOnChangeText(value, 'CountryTo')}
            items={countryPicker.map((country, index) => ({
                label: country.Country,
                value: country.Country,
                key: index.toString(),
            }))}
            />
            
            <Text style={styleSheet.label}>Number Of Days:</Text>
            <TextInput
            style={styleSheet.input}
            value={NumDays}
            keyboardType="numeric"
            onChangeText={(value) => handleOnChangeText(value, 'NumDays')}
            />

            <Text style={styleSheet.label}>Number of Passangers:</Text>
            <TextInput
            style={styleSheet.input}
            value={numPass}
            keyboardType="numeric"
            onChangeText={(value) => handleOnChangeText(value, 'numPass')}
/>
            {error ? <Text style={{color: 'red', fontSize: 18, textAlign: 'center'} }>{error}</Text>: null}

            <View style={styleSheet.buttonContainer}>
            <TouchableOpacity
            style={styleSheet.buttonPrimary}
            onPress={submitForm}
            >
                <Text style={styleSheet.buttonPrimaryText}>Submit</Text>
            </TouchableOpacity>           

            </View>
            
            <View>
                <Text style={styleSheet.label}>
                    Here are your Tickets:
                </Text>
                {tickets.map((ticket)=>(
                    <TicketDesc
                        key={ticket.travelID}
                        id={ticket.travelID}
                        countryFrom={ticket.CountryFROM}
                        countryTo={ticket.countryTo}
                        distanceKm={ticket.distance}
                        numPass={ticket.numPass}
                        numDays={ticket.NumDays}
                        price={ticket.Price}
                        onDelete={()=> handleDelete(ticket.travelID)}/>
                ))}
            </View>

            <View>
                {
                    countryPicker.map((data)=>(
                        <CountryDesc
                        key={data.countryID}
                        country={data.Country}
                        city={data.city}
                        description={data.Description}
                        img={data.img}
                        long={data.Longitude}
                        lat={data.latitude} />
                    ))}
            </View>
     
        </ScrollView>
    )
}

export default Dashboard;