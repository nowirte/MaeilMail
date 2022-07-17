const initialState = {
  loginEmail: '',
  loginPassword: '',
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_EMAIL':
      return { ...state, loginEmail: action.email };
    case 'LOGIN_PASSWORD':
      return { ...state, lgoinPassword: action.password };
    default:
      return state;
  }
}
