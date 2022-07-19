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
      return { ...state, signupNickname: action.password };

    case 'SIGNUP_GENDER':
      return { ...state, signupGender: action.email };

    case 'SIGNUP_LOCATION':
      return { ...state, signupLocation: action.password };

    case 'SIGNUP_LATITUDE':
      return { ...state, signupLatitude: action.password };

    case 'SIGNUP_LONGTITUDE':
      return { ...state, signupLongitude: action.password };

    default:
      return state;
  }
}
