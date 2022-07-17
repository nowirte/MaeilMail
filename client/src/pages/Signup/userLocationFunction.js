export default async function getLocInfo() {
  try {
    const position = await new Promise((resolve, rejected) => {
      navigator.geolocation.getCurrentPosition(resolve, rejected);
    });

    const Lat = position.coords.latitude;
    const Lng = position.coords.longitude;

    const data = getCountryData(Lat, Lng);
    return data;
  } catch (err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}

function getCountryData(lat, lng) {
  return fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(res => res.json())
    .then(data => {
      return data.countryName;
    });
}
