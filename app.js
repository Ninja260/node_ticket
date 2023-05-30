require('dotenv').config();
const express = require('express');
const app = express();
const protectedRouter = require("./app/routes/api/protected");
const unprotectedRouter = require('./app/routes/api/unprotected');
const { customErrorHandler } = require('./app/utils/errorUtils');
const seedUsers = require('./app/seeders/user');
const seedRoles = require('./app/seeders/role');
const seedTicketApprovalConfigs = require('./app/seeders/ticketApprovalConfig');
const mongoose = require('mongoose');

// connect to mongo database
mongoose.connect(process.env.MONGO_DB_URL)
    .then(async () => {
        console.log('CONNECTED to mongoDB');

        await seedRoles();
        await seedTicketApprovalConfigs();
        await seedUsers();
    })
    .catch(err => console.log(err));

app.set('port', process.env.PORT);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routes
app.use('/api', unprotectedRouter, protectedRouter);
app.get('/ping', (_, res) => {
    res.send('pong!');
});

// custom error handler
app.use(customErrorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});