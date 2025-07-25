// GPS Location Auto-Fill
document.addEventListener('DOMContentLoaded', () => {
    const getGpsBtn = document.querySelector('.get-gps-btn');
    const gpsLocationInput = document.getElementById('gpsLocation');

    if (getGpsBtn && gpsLocationInput) {
        getGpsBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                getGpsBtn.textContent = 'Fetching Location...';
                getGpsBtn.disabled = true; // Disable button while fetching

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        // Initialize BigDataCloud Reverse Geocode API Client
                        const reverseGeocoder = new BDCReverseGeocode();

                        // Get administrative location information using known coordinates
                        reverseGeocoder.getClientLocation({
                            latitude: latitude,
                            longitude: longitude,
                        }, function(result) {
                            if (result && result.localityInfo && result.localityInfo.administrative) {
                                const admin = result.localityInfo.administrative;
                                let fullAddress = '';

                                // Find relevant administrative levels
                                const country = admin.find(a => a.adminLevel === 2)?.name || '';
                                const state = admin.find(a => a.adminLevel === 4)?.name || '';
                                const city = admin.find(a => a.adminLevel === 7)?.name || result.locality || '';
                                
                                // Construct address from most specific to general, if available
                                if (result.plusCode && result.plusCode.compoundCode) {
                                    // Use compound code if available, it's often very specific
                                    fullAddress += result.plusCode.compoundCode.split(' ').slice(1).join(' '); // Remove global code prefix
                                }
                                if (result.locality) {
                                    if (fullAddress) fullAddress += ', ';
                                    fullAddress += result.locality; // Town/village name
                                }
                                if (result.postcode) {
                                    if (fullAddress) fullAddress += ', ';
                                    fullAddress += result.postcode;
                                }
                                if (city && city !== result.locality) { // Avoid duplicating city if it's the same as locality
                                    if (fullAddress) fullAddress += ', ';
                                    fullAddress += city;
                                }
                                if (state) {
                                    if (fullAddress) fullAddress += ', ';
                                    fullAddress += state;
                                }
                                if (country) {
                                    if (fullAddress) fullAddress += ', ';
                                    fullAddress += country;
                                }

                                if (fullAddress) {
                                    gpsLocationInput.value = fullAddress;
                                } else {
                                    gpsLocationInput.value = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`; // Fallback to coordinates
                                    alert('Could not get a detailed address for your location, using coordinates.');
                                }
                            } else {
                                gpsLocationInput.value = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`; // Fallback to coordinates
                                alert('Could not retrieve detailed location information. Using coordinates.');
                            }
                            getGpsBtn.textContent = 'Location Fetched!';
                            getGpsBtn.disabled = false;
                        });
                    },
                    (error) => {
                        let errorMessage = 'Unable to retrieve your location.';
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage = 'Location access denied. Please enable it in your browser settings.';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage = 'Location information is unavailable.';
                                break;
                            case error.TIMEOUT:
                                errorMessage = 'The request to get user location timed out.';
                                break;
                            default:
                                errorMessage = 'An unknown error occurred.';
                                break;
                        }
                        gpsLocationInput.value = ''; // Clear any previous value
                        alert(errorMessage); // Use alert for now, can be replaced with a better UI message
                        getGpsBtn.textContent = 'Get Current Location';
                        getGpsBtn.disabled = false;
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Options for getCurrentPosition
                );
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        });
    }

// Image Preview
    const treeImageInput = document.getElementById('treeImage');
    const imagePreview = document.getElementById('imagePreview');

    if (treeImageInput && imagePreview) {
        treeImageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block'; // Show the image preview
                };
                reader.readAsDataURL(file);
            } else {
                imagePreview.src = '#';
                imagePreview.style.display = 'none'; // Hide if no file selected
            }
        });
    }
}); 