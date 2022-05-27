const PgPromise = require("pg-promise")
const express = require('express');
const fs = require('fs');
require('dotenv').config()



const API = require('./api');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const DATABASE_URL = process.env.DATABASE_URL;
// const PORT= process.env.PORT;
const pgp = PgPromise({});
// const db = pgp(DATABASE_URL);
const config = {
	connectionString: process.env.DATABASE_URL || 'postgres://sinovuyo:gar123@localhost:5432/garment_app',
	max: 30,
	ssl:{ rejectUnauthorized : false}
 };
 
 const db = pgp(config);

API(app, db);



function filterData() {
	fetch(`/api/garments?gender=${genderFilter}&season=${seasonFilter}`)
		.then(function (result) {
			this.garments = result.data.garments

		});

	fetch(`/api/garments`)
		.then(function (result) {
			this.garments = result.data.garments
		});
}


const PORT = process.env.PORT || 4017;

// API routes to be added here

app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});