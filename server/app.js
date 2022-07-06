const express = require("express");
const app = express();
const port = 3001;
const maria = require("./database/connect/maria");
maria.connect();
const swaggerUi = require('swagger-ui-express');

/**
 * @swagger
 *  /select:
 *    get:
 *      tags:
 *      - product
 *      description: 모든 데이터 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: category
 *          required: false
 *          schema:
 *            type: String
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 테스트 성공
 */
 




app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.js')));
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/select", (req, res) => {
    maria.query('SELECT * FROM uses', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err);
        }
    })
});
app.listen(port, ()=> console.log("Example app listen"));
