import React from "react";

const TicketDesc = ({
  id,
  countryFrom,
  countryTo,
  distanceKm,
  numPass,
  numDays,
  price,
  onDelete
}) => {
  const handleDelete = () =>{
    onDelete();
  }
  
return (
    <div className="tickets">
      <div className="ticket-header">
        <h2 className="ticket-title" style={{color: 'white'}}>Flight Ticket Number: {id}</h2>
      </div>
      <div className="ticket-info">
        <p>
          <strong>From:</strong> {countryFrom}
        </p>
        <p>
          <strong>To:</strong> {countryTo}
        </p>
        <p>
          <strong>Distance:</strong> {distanceKm} km
        </p>
        <p>
          <strong>Passengers:</strong> {numPass}
        </p>
        <p>
          <strong>Days:</strong> {numDays}
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <button className="DeleteBtn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TicketDesc;
