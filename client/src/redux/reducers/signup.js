const initialState = {
  signupEmail: '',
  signupPassword: '',
  signupNickname: '',
  signupGender: '',
  signupLocation: '',
  signupLatitude: 0,
  signupLongitude: 0,
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_EMAIL':
      return { ...state, signupEmail: action.email };

    case 'SIGNUP_PASSWORD':
      return { ...state, signupPassword: action.password };

    case 'SIGNUP_NICKNAME':
      return { ...state, signupNickname: action.nickname };

    case 'SIGNUP_GENDER':
      return { ...state, signupGender: action.gender };

    case 'SIGNUP_LOCATION':
      return { ...state, signupLocation: action.location };

    case 'SIGNUP_LATITUDE':
      return { ...state, signupLatitude: action.latitude };

    case 'SIGNUP_LONGTITUDE':
      return { ...state, signupLongitude: action.longtitude };

    default:
      return state;
  }
}
