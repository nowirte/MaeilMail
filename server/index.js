const app = require('./src/app.js');
const db = require("./src/database/config/db.config.js")
const PORT = process.env.PORT || 3000;
db.connect(error => {
    if (error) throw error
    console.log("DB 연결 성공"); 
})
app.listen(PORT, () => {
    console.log(`서버 정상 실행 http://localhost:${PORT}`)
})