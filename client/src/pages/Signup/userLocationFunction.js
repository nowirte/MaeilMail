import axios from 'axios';

export default async function getLocInfo() {
  try {
    const res = await axios(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_LOCATION_API_KEY}`
    );
    console.log(res);
    const { latitude, longitude, country_name } = res.data;

    return { location: country_name, latitude: latitude, longitude: longitude };
  } catch (err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}
