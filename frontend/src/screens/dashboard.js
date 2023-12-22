import { useLocation, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CountryDesc from "../Components/Country";
import { getDistance } from "../Components/Distance";
import $ from 'jquery';
import '../style/dashboard.css';
import TicketDesc from "../Components/Ticket";
import axios from "axios";

const Dashboard= () =>{
    const location = useLocation();

    let UserID = parseInt(location.state.userID);

    const [valuesIn, setValuesIn] = useState({
        countryFrom: "",
        countryTo: "",
        numDays: "",
        numPass: ""
    });
    const [countriesForm, setCountriesForm] = useState([]);

    const [countries, setCountries] = useState([]);
    const [filterString, setFilterString] = useState('');
    

//-------This is for search bar

    const fetchCountries = (filter) =>{
        fetch('http://localhost:8082/getCountries')
        .then(res => res.json())
        .then(countries => {
            const filteredCountries = countries.filter(country => country.Country.toUpperCase().startsWith(filter.toUpperCase()));
            setCountries(filteredCountries)})
        .catch(err=> console.log('Error: '+ err))
        
    }
    useEffect(()=>{
        fetchCountries(filterString);
    }, [filterString]);

//-------This is for select inputs
    useEffect(()=>{
        fetch('http://localhost:8082/getCountries')
        .then(res => res.json())
        .then(countriesForm => {setCountriesForm(countriesForm)})
        .catch(err=> console.log('Error: '+ err))
    })

    
    const handleInputChange = (e) =>{
        setFilterString(e.target.value);
    }
    function countryDetails(countryName){
        const country = countriesForm.find(country => country.Country === countryName);

        let countryData = {
            countryName: country.Country,
            capital: country.city,
            Longitude: country.Longitude,
            latitude: country.latitude,
        }
        return countryData;
    }

    const handleDelete = (id) =>{
        const updatedTickets = tickets.filter(tickets => tickets.travelID !== id);
        try{
            axios.delete('http://localhost:8082/deleteTicket/'+ id)
        }
        catch(err){
            console.log('Error: ' + err);
        }
        setTickets(updatedTickets);
    }
    
    const [tickets, setTickets] = useState([]);


    useEffect(()=>{
        fetch('http://localhost:8082/getReservation/'+ UserID)
        .then(res=>res.json())
        .then(tickets=> setTickets(tickets))
        .catch(err=>console.log("Error: "+ err))
    })


    function handleSubmit(){
        let flag = true;
        let errMsg = $('#errMsg');
        if(valuesIn.countryFrom === '' || valuesIn.countryTo === '' || valuesIn.numDays === '' || valuesIn.numPass === '')
        {
            errMsg.text('All Fields are Required');
            flag = false;
        }
        if(valuesIn.countryFrom !=='' &&valuesIn.countryTo !=='' && valuesIn.numDays !=='' && valuesIn.numPass !==''){    
            errMsg.text('');
            flag = true
        }
        if(valuesIn.numDays<1 || valuesIn.numPass<1){
            flag = false;
            errMsg.text(`Number of Days or Persons cannot be Negative`);
        }
        if(flag){
            let CountryFROM = valuesIn.countryFrom;
            let CountryTo = valuesIn.countryTo;
            let CountryFromData = countryDetails(CountryFROM);
            let CountryToData = countryDetails(CountryTo);

            let coordsFrom = [CountryFromData.Longitude, CountryFromData.latitude];
            let coordsTo = [CountryToData.Longitude, CountryToData.latitude];
            let distance = getDistance(coordsFrom, coordsTo);
            let Price = parseInt(distance/100) * (valuesIn.numDays + valuesIn.numPass)
            let travelID = tickets.length+1
            let NumDays = parseInt(valuesIn.numDays);
            let numPass = parseInt(valuesIn.numPass);
            const newTicket ={
                travelID: travelID,
                UserID: UserID,
                CountryFROM: CountryFROM,
                CountryTo: CountryTo,
                distance: distance,
                NumDays: NumDays,
                numPass: numPass,
                Price: Price 
            };

            axios.post('http://localhost:8082/addTicket',
            {travelID, UserID, CountryFROM, CountryTo, distance, NumDays, numPass, Price})
            .then(response => console.log(response))
            .catch(err =>console.log(err));
            setTickets([...tickets, newTicket]);
            
$('#MyData').val('');$('#MyData2').val('');
            $('#numDays').val(1);$('#numPers').val(1);
            setValuesIn({
                countryFrom:'',
                countryTo:'',
                numDays:1,
                numPass:1
            })
        }}

    return(
        <>

            <h1 id="welcomeName">Hello, {location.state.name}
            , Start your adventure Now!</h1>

        <div id="formSubD">
                <h3>Book your Flight Now: </h3>
            <div>
                <label> From: </label>
                <select id="MyData"
                  onChange={event => setValuesIn({ ...valuesIn, countryFrom: event.target.value })}>
                    <option value=""></option>
                    {countriesForm.map((data, i)=>(
                       <option value={data.Country}>{data.Country}</option>
                    ))}
                </select>
            </div>
            <div>
                <label> To: </label>
                <select id="MyData2"
                onChange={event => setValuesIn({ ...valuesIn, countryTo: event.target.value })}>
                    <option value=""></option>
                    {countriesForm.map((data, i)=>(
                       <option value={data.Country}>{data.Country}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Enter Number Of Days</label>
                <input type="number" id="numDays" onChange={event => setValuesIn({ ...valuesIn, numDays: event.target.value })}/>
            </div>
            <div>
                <label>Enter Number of Passenger</label>
                <input type="number" id="numPers"  onChange={event => setValuesIn({ ...valuesIn, numPass: event.target.value })}/>
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>

        </div>            
        <div id="errMsg"></div>

title, description,image, time, onDelete

        <div id="ticketList">
            {tickets.map((data, key) =>(
                <TicketDesc
                id = {data.travelID}
                countryFrom={data.CountryFROM}
                countryTo={data.countryTo}
                distanceKm={data.distance}
                numPass={data.numPass}
                numDays={data.NumDays}
                price={data.Price}
                onDelete={()=>handleDelete(data.travelID)}
                />
            ))}
        </div>

        <div id="Country">
                <input type="text" onChange={handleInputChange}
                placeholder="SEARCH FOR YOUR FAVORITE COUNTRY"
                style={{
                    width: '80%',
                    padding: '20px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    margin: '0 auto',
                    display: 'block',
                
                }}/>
            {countries.map((d,i)=>CountryDesc(d.Country,d.city,d.Description,d.img,d.Longitude,d.latitude))}
        </div>
    <Link to={'/'} style={{textDecoration: 'none'}}>
        <button className="backBtn" style={{color: 'white'}}>Back</button>
    </Link>   
        </>
    )
}
export default Dashboard;