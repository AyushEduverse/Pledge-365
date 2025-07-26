// GPS Location Auto-Fill
document.addEventListener('DOMContentLoaded', () => {
    const getGpsBtn = document.querySelector('.get-gps-btn');
    const mapDiv = document.getElementById('map');
    const mapLocationOverlay = document.getElementById('mapLocationOverlay'); // Get the new overlay div
    const overlayAreaName = mapLocationOverlay ? mapLocationOverlay.querySelector('.overlay-area-name') : null; /* This is now city, state, country */
    const overlayFullAddress = mapLocationOverlay ? mapLocationOverlay.querySelector('.overlay-full-address') : null;
    const overlayCoords = mapLocationOverlay ? mapLocationOverlay.querySelector('.overlay-coords') : null;
    const overlayDatetime = mapLocationOverlay ? mapLocationOverlay.querySelector('.overlay-datetime') : null;

    // Initialize Leaflet Map (default view, will update on GPS)
    let map = null;
    let locationMarker = null; // To store the dynamic marker

    // Function to initialize the map if not already initialized
    function initMap(latitude, longitude) {
        if (!map) {
            map = L.map('map', { zoomControl: false }).setView([latitude, longitude], 13); // Default zoom level, disable default zoom control

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add a custom zoom control to a specific corner if needed
            L.control.zoom({ position: 'topright' }).addTo(map);

        } else {
            map.setView([latitude, longitude], map.getZoom());
        }

        // Add/Update dynamic marker
        if (locationMarker) {
            locationMarker.setLatLng([latitude, longitude]);
        } else {
            const redIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            locationMarker = L.marker([latitude, longitude], {icon: redIcon}).addTo(map);
        }

        // Show the map if it was hidden
        if (mapDiv) {
            mapDiv.style.display = 'block';
        }
    }

    // Function to format current date and time
    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    }

    // Function to display location info in the overlay
    function displayLocationInOverlay(areaName, fullAddress, latitude, longitude) {
        if (mapLocationOverlay && overlayAreaName && overlayFullAddress && overlayCoords && overlayDatetime) {
            overlayAreaName.textContent = areaName;
            overlayFullAddress.textContent = fullAddress;
            overlayCoords.textContent = `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`;
            overlayDatetime.textContent = formatDateTime(new Date());

            mapLocationOverlay.classList.add('show'); // Animate in
        }
    }

    // Function to hide location info overlay
    function hideLocationOverlay() {
        if (mapLocationOverlay) {
            mapLocationOverlay.classList.remove('show'); // Animate out
        }
    }

    if (getGpsBtn) {
        getGpsBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                getGpsBtn.textContent = 'Fetching Location...';
                getGpsBtn.disabled = true; // Disable button while fetching
                hideLocationOverlay(); // Hide overlay while fetching new location

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        // Use geocode.maps.co API for reverse geocoding
                        const apiKey = '6884d5e6e47a8669850751nce0ae59a';
                        const geocodeMapsCoUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${apiKey}`;

                        fetch(geocodeMapsCoUrl)
                            .then(response => response.json())
                            .then(data => {
                                console.log('geocode.maps.co API Response:', data); // Keep this for debugging area name
                                let areaName = 'Unknown Location';
                                let fullAddress = 'Address not found.';

                                if (data && data.address) {
                                    const address = data.address;
                                    const city = address.city || address.town || address.village || address.hamlet || '';
                                    const state = address.state || '';
                                    const country = address.country || '';

                                    // Prioritize more granular area names for the bold display
                                    if (address.suburb) {
                                        areaName = address.suburb;
                                    } else if (address.neighbourhood) {
                                        areaName = address.neighbourhood;
                                    } else if (address.city_district) {
                                        areaName = address.city_district;
                                    } else if (address.county) {
                                        areaName = address.county;
                                    } else if (address.district) {
                                        areaName = address.district;
                                    } else if (address.town) {
                                        areaName = address.town;
                                    } else if (address.village) {
                                        areaName = address.village;
                                    } else if (address.road) {
                                        areaName = address.road;
                                    } else if (address.footway) {
                                        areaName = address.footway;
                                    } else {
                                        // Fallback to City, State, Country if no specific local area is found
                                        const areaParts = [];
                                        if (city) areaParts.push(city);
                                        if (state) areaParts.push(state);
                                        if (country) areaParts.push(country);
                                        areaName = areaParts.length > 0 ? areaParts.join(', ') : 'Unknown Location';
                                    }

                                    fullAddress = data.display_name || 'Address not found.';

                                } else if (data && data.display_name) {
                                    fullAddress = data.display_name;
                                    areaName = data.display_name.split(',').slice(-3).map(s => s.trim()).join(', ');
                                    if (areaName === '') areaName = 'Unknown Location';
                                }

                                // Log data to console for Firebase storage (optional, but good for future)
                                console.log('Location Data for Firebase (for future use):', {
                                    areaName: areaName,
                                    fullAddress: fullAddress,
                                    latitude: latitude,
                                    longitude: longitude,
                                    timestamp: new Date().toISOString() // ISO format for easy storage
                                });

                                displayLocationInOverlay(areaName, fullAddress, latitude, longitude); // Display in overlay

                                initMap(latitude, longitude); // Update map with new location

                                getGpsBtn.textContent = 'Location Fetched!';
                                getGpsBtn.disabled = false;
                                showToast('Location fetched!', 'success'); // General success toast
                            })
                            .catch(error => {
                                console.error('Error fetching geocode.maps.co data:', error);
                                showToast('Could not retrieve detailed location information. Using coordinates.', 'error');
                                // Still display a fallback in the overlay on error
                                displayLocationInOverlay('Unknown Area', `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`, latitude, longitude); 
                                initMap(latitude, longitude); // Still update map to current coords
                                getGpsBtn.textContent = 'Get Current Location';
                                getGpsBtn.disabled = false;
                            });
                    },
                    (error) => {
                        let errorMessage = 'Unable to retrieve your location.';
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage = 'Location access denied. Please ensure location services are enabled for your browser and website, and that you are accessing over HTTPS.';
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
                        showToast(errorMessage, 'error');
                        // Display error in the overlay as well
                        displayLocationInOverlay('Error', errorMessage, '', '');
                        getGpsBtn.textContent = 'Get Current Location';
                        getGpsBtn.disabled = false;
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Options for getCurrentPosition
                );
            } else {
                showToast('Geolocation is not supported by your browser.', 'error');
                // Display fallback message in the overlay
                displayLocationInOverlay('N/A', 'Geolocation not supported by your browser.', 0, 0); 
            }
        });
    }

// Image Preview
    const treeImageInput = document.getElementById('treeImage');
    const imagePreview = document.getElementById('imagePreview');
    const customFileUpload = document.querySelector('.custom-file-upload'); // Get the custom upload area

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

    // Add click listener to the custom file upload area
    if (customFileUpload && treeImageInput) {
        customFileUpload.addEventListener('click', () => {
            treeImageInput.click(); // Trigger the hidden file input
        });
    }

    // Initial map display (default location, e.g., a central point)
    if (mapDiv) {
        initMap(26.449923, 80.331871); // Set to Kanpur's approximate center
        // No overlay display on load, it will show after fetching location
    }
}); 