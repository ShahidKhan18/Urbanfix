async function getGoogleGeolocation() {
  try {
    const response = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`
    );
    return response.data.location; // { lat, lng }
  } catch (error) {
    console.error("❌ Google Geolocation Error:", error.message);
    return null;
  }
}

