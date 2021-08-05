function initMap() {
    let map;
    // Default map
    let location = {
        lat: 38.9072,
        lng: 77.0369
    }
    // Map options
    const options = {
        center: location,
        zoom: 12
    }

    // Check if GeoLocation is enabled
    if(navigator.geolocation) {
        // If geolocation returns true
        console.log('geolocation enabled!');
        navigator.geolocation.getCurrentPosition((loc) => {
            // Success Callback
            // lat / lng properties of location set to geolocation coords
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;

            // Write the map with user location
            map = new google.maps.Map(document.getElementById('map'), options);
        },
            // Error Callback
            (err) => {
            console.log('User did not enable location services')
            // Write map with default location
            map = new google.maps.Map(document.getElementById('map'), options);
        }
        )} 
    else {
        // If geolocation returns false
        console.log('Geolocation is not supported');
        //Write map with default location
        map = new google.maps.Map(document.getElementById('map'), options); 
    }

    

    ////////////////////////////////// Autocomplete ///////////////////////////////////////
   
    // Create a variable for starting point and first destination inputs
    const inputs = document.getElementsByClassName('autocomplete');

    // Create a variable for autocomplete options
    const autocompleteOptions = {
        componentRestrictions: {'country': ['us']},
        fields: ['geometry', 'name'],
        types: ['geocode']
    };

    // Create an array for autocomplete instances
    const autocompletes = [];

    // Create an instance of autocomplete
    for (let i = 0; i < inputs.length; i++) {
        autocomplete = new google.maps.places.Autocomplete(inputs[i], autocompleteOptions);
        autocomplete.inputId = inputs[i].id;
        autocomplete.addListener('place_changed', fillIn);
        autocompletes.push(autocomplete);
    }

    // Create variables for marker info
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = 0;
    let markers = [];

    function fillIn() {
        console.log(this.inputId);
        let place = this.getPlace();
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            label: labels[labelIndex++ % labels.length],
            title: place.name,
            map: map});
            markers.push(marker);
            console.log(markers);
        // console.log(place. address_components[0].long_name);
    }

}