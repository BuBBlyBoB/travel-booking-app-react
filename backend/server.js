import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"travelBooking"  
});

//-----------http://localhost:8082/</path>---------//

app.get('/testing', (req, res) => {
    res.send('test');
});
//------------------------------------------------------------------Countries
app.get('/getCountries',(req, res)=>{
    const sql = 'SELECT * FROM `counties` ORDER BY `countryID` ASC '
    db.query(sql,(err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
})});

//------------------------------------------------------------------Users

app.get('/getUsers',(req, res)=>{
    const sql = 'SELECT * FROM `user`;';
    db.query(sql,(err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
})});

app.post('/addUser',(req, res) =>{
    var query = 'INSERT INTO user (UserID, Name, email, password) VALUES (?)';
    const values = [req.body.userID, req.body.name, req.body.email, req.body.password]
    db.query(query,[values], (err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/login',(req, res) => {
    const sql = 'Select * FROM user WHERE email=? AND password=?;' ;
    db.query(sql,[req.body.Email, req.body.Pass],(err, data)=>{
        if(err)
            {console.error("eror: "+ err);
            return res.json({Message: "Server Side Error"});
}        if(data != 0)
            return res.json(data);
        else
            return res.json({Message:"User Not registered"});
    })
});

//------------------------------------------------------------------flight

app.get('/getReservation/:id',(req, res)=>{
    const sql = 'SELECT * FROM `travel` where UserID =?;';
    const id = req.params.id;
    db.query(sql,[id],(err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
})});

app.post('/addTicket',(req, res) =>{
    var query = 'INSERT INTO `travel`(`travelID`, `UserID`, `CountryFROM`, `countryTo`, `distance`, `NumDays`, `numPass`, `Price`) VALUES (?)';
    const values = [req.body.travelID, req.body.UserID, req.body.CountryFROM, req.body.CountryTo, req.body.distance, req.body.NumDays, req.body.numPass, req.body.Price];
    db.query(query,[values], (err, data) =>{
        if(err) return res.json(err); 
        return res.json(data);
    })
})

app.delete('/deleteTicket/:id', (req, res) =>{
    const sql = "DELETE FROM `travel` WHERE `travel`.`travelID` = ?";
    const id = req.params.id;
    db.query(sql, [id], (err,data) =>{
        if(err) return console.log(err);
        return res.json(data);
})});

app.put('/updateTicket/:id',(req, res)=>{
    const sql ="UPDATE `travel` SET `CountryFROM` =?, `countryTo` =?, `NumDays` =?, `numPass` =? WHERE `travel`.`travelID` =?"
    const values = [req.body.CountryFROM, req.body.countryTo,req.body.NumDays, req.body.numPass];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8082, () => {
    console.log(`Listening ....`);
});
