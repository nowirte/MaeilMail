import 'dotenv/config';
import { app } from './src/app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`서버 정상 실행 http://localhost:${PORT}`)
})