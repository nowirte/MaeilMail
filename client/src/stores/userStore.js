import { createStore } from 'redux';

import reducer from '../pages/MyPage/reducer/mypage';

export const store = createStore(reducer);
