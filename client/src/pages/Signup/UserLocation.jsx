import { React, useEffect } from 'react';
import styled from 'styled-components';
import location from './location.png';
import refresh from './refresh.png';
import { useSelector, useDispatch } from 'react-redux';
import useLoc from './userLocationFunction';

const LocationContainer = styled.div`
  height: 50px;
  width: 330px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px;

  border-radius: 20px;
  border: 4px solid #a9a9a9;

  font-size: 1.5rem;
`;

const Location = styled.img`
  width: 40px;
  height: 40px;

  border: none;
`;

const Refresh = styled.img`
  width: 40px;
  height: 40px;

  border: none;
`;

const UserLocation = () => {
  const dispatch = useDispatch();
  const country = useSelector(state => state.signup.signupLocation);

  //추후 useEffect 분리 필요
  useEffect(() => {
    async function getLocInfo() {
      try {
        const position = await new Promise((resolve, rejected) => {
          navigator.geolocation.getCurrentPosition(resolve, rejected);
        });

        const latitude = position.coords.latitude;
        const longtitude = position.coords.longitude;
        dispatch({ type: 'SIGNUP_LATITUDE', latitude: latitude });
        dispatch({ type: 'SIGNUP_LONGTITUDE', longtitude: longtitude });

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
          dispatch({ type: 'SIGNUP_LOCATION', location: data.countryName });
          return data.countryName;
        });
    }
    getLocInfo();
    console.log('change');
  }, []);

  async function refreshHandleClick(e) {
    e.preventDefault();
    const data = await useLoc();
    dispatch({ type: 'SIGNUP_LOCATION', location: data });
    console.log('click');
  }

  return (
    <LocationContainer>
      <Location src={location} alt="location" />
      <span>{country}</span>
      <Refresh src={refresh} alt="refresh" onClick={refreshHandleClick} />
    </LocationContainer>
  );
};

export default UserLocation;
