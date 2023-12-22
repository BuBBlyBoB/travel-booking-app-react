import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const TicketDesc = ({
  id,
  countryFrom,
  countryTo,
  distanceKm,
  numPass,
  numDays,
  price,
  onDelete,
  onEdit
}) => {
  const handleDelete = () => {
    onDelete();
  };
  const handleEdit = () =>{
    onEdit();
  }

  return (
    <View style={styles.tickets}>
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketTitle}>Flight Ticket Number: {id}</Text>
      </View>
      <View style={styles.ticketInfo}>
        <Text>
          <Text style={styles.label}>From: </Text>
          {countryFrom}
        </Text>
        <Text>
          <Text style={styles.label}>To: </Text>
          {countryTo}
        </Text>
        <Text>
          <Text style={styles.label}>Distance: </Text>
          {distanceKm} km
        </Text>
        <Text>
          <Text style={styles.label}>Passengers: </Text>
          {numPass}
        </Text>
        <Text>
          <Text style={styles.label}>Days: </Text>
          {numDays}
        </Text>
        <Text>
          <Text style={styles.label}>Price: </Text>
          ${price}
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = {
  tickets: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  ticketHeader: {
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ticketInfo: {
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'yellow',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: 'black',
    fontWeight: 'bold',
}
}
export default TicketDesc;
