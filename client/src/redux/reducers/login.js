const initialState = {
  loginEmail: '',
  loginPassword: '',
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_EMAIL':
      return { ...state, loginEmail: action.email };
    case 'LOGIN_PASSWORD':
      return { ...state, loginPassword: action.password };
    default:
      return state;
  }
}
