const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialzed: false,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 //쿠키 유효시간 1시간
    },
}));

const server = app.listen(3000, () => {
    console.log("Server Started. port 3000.");
});

const db = {
    database: "dev_class",
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "258025",
};

const dbPool = require('mysql').createPool(db);

app.post('/api/login', async (request, res) => {

});

const sql = require('./sql.js');

app.post('/api/logout', async (request, res) => {

});

// 사용자가 위에 있는 login, logout 외의 접근을 할 때 여기로 접속됨
app.post('/api/:alias', async (request, res) => {
    try {
        res.send(await req.db(request.params.alias))
    } catch (err) {
        res.status(500).send({
            error: err
        });
    }
});

const req = { 
    async db(alias, param = [], where = '' ) {
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where , param, (error, rows) => {
            if ( error ) {
                if ( error.code != 'ER_DUP_ENTRY')
                    console.log(error); 
                resolve({
                    error
                });
            } else resolve(rows);
        }));
    } 
};