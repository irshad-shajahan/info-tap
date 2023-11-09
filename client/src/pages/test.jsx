import React, { useState } from 'react'

function Test() {
    const [location, setLocation] = useState(null);
    const [distance,setDistance] = useState(null)

    const formatDistanceInMeters = (distanceInKilometers) => {
        const distanceInMeters = distanceInKilometers * 1000;
        setDistance(distanceInMeters.toFixed(2))
      };

    const markAttendance = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log({ latitude, longitude });
      
              // Replace these with the actual coordinates of the office
              const officeLatitude = 10.0079; // Replace with office latitude
              const officeLongitude = 76.3059; // Replace with office longitude
      
              // Calculate distance using Haversine formula
              const distance = calculateHaversineDistance(latitude, longitude, officeLatitude, officeLongitude);
      
              // Set a threshold radius (10 meters in this case)
              const radiusThreshold = 0.01; // You may need to adjust this based on your use case
            console.log(distance);
            formatDistanceInMeters(distance)
              if (distance <= radiusThreshold) {
                // User is within the allowed radius
                setLocation({ latitude, longitude });
              } else {
                // User is not allowed, show an error message or handle accordingly
                console.error('You are not allowed to mark attendance outside the office radius.');
              }
            },
            (error) => {
              console.error('Error getting geolocation:', error.code, error.message);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
      
      // Haversine formula to calculate distance between two coordinates
      const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
      
        return distance;
      };
      
      // Utility function to convert degrees to radians
      const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
      };


  return (
    <div className='h-screen flex flex-col justify-center items-center'>
         your location: {location?.latitude},{location?.longitude}
       <button className='bg-red-500 px-5 py-2' onClick={markAttendance}>test</button>
        distance:{distance}
    </div>
  )
}

export default Test