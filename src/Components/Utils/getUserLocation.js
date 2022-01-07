export default function getUserLocation(setUserLocation) {
    console.log("Get user location");
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            const { latitude, longitude } = coords;
            // console.log({ lat: latitude, lng: longitude })
            setUserLocation({ latitude, longitude });
        });
    } else {
        alert("Sorry cannot get location");
    }
}
