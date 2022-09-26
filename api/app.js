/* ===== ENVIROMENT VARIBALES FILE CONFIG ===== */

require('dotenv').config({path: '.env'})

/* ========== */

/* ===== REQUIRED IMPORTS  ===== */

const express = require('express')

/* ========== */

/* ===== VARIABLES ===== */

const PORT = process.env.PORT || 8082

/* ========== */ 

/* ===== APP INITIALIZATION ===== */

const app = express()

/* =========== */

/* ===== MIDDLEWWARES ===== */

app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* ========== */

/* ===== APP LISTENING ===== */

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

/* ========== */