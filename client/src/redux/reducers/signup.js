const initialState = {
  email: '',
  password: '',
  nickname: '',
  gender: '',
  location: '',
  latitude: 0,
  longitude: 0,
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_EMAIL':
      return { ...state, email: action.email };

    case 'SIGNUP_PASSWORD':
      return { ...state, password: action.password };

    case 'SIGNUP_NICKNAME':
      return { ...state, nickname: action.nickname };

    case 'SIGNUP_GENDER':
      return { ...state, gender: action.gender };

    case 'SIGNUP_LOCATION':
      return { ...state, location: action.location };

    case 'SIGNUP_LATITUDE':
      return { ...state, latitude: action.latitude };

    case 'SIGNUP_LONGTITUDE':
      return { ...state, longitude: action.longtitude };

    default:
      return state;
  }
}
