import axios from 'axios';

export default async function getLocInfo() {
  try {
    const res = await axios(
      `https://geolocation-db.com/json/`
    );
    const { latitude, longitude, country_name } = res.data;

    return { location: country_name, latitude: latitude, longitude: longitude };
  } catch (err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}
