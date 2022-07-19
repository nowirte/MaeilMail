import createAsyncThunk from "@reduxjs/toolkit"

const initialState = {
  Letters: []
}

const mainLettersReducer = (state,action) => {
  switch (action.type) {
    case "mainLetters/init": {
      return {...state, Letters: action.payload.initData}
    }
    case "mainLetters/update": {
      const {Letters} = state;
      // Letters.map((letter)=>{
      //   const time = Date.now().getTime()
      //   const receiveTime = letter.receive_date.getTime();
      // })
      Letters.reduce((a,c)=>{
        const time = Date.now().getTime()
      })
    }
    default:
      return state;
  }
}

const updateLetters = createAsyncThunk(
  "UPDATE_LIST",
  async ({ listId, content }) => {
    const response = await axios.put(`http://localhost:8000/list/${listId}`, {
      content: content,
    });
    return { listId, content };
  }
);