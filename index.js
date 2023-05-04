const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { connectDB, sequelize } = require('./config/db');

// Connecting to the mySQL databsae
connectDB()

