import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import os from 'os';
import session from 'express-session';
import  FileStore  from 'session-file-store';
import flash from 'express-flash';

const FileStoreInstance = FileStore(session);
import conn from './db/conn.mjs'

// models
import Tought from './models/Thought.mjs'
import User from './models/User.mjs'

// Import routes
import toughtRoutes from './routes/toughtRoutes.mjs'
import ToughtController from './controllers/ToughtController.mjs';
import authRoutes from './routes/authRoutes.mjs'

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// get user response
app.use(
        express.urlencoded({
                extended: true
        })
)

app.use(express.json())

// session midleware
app.use(session({
        name: "session",
        secret: 'our-secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStoreInstance({
                path: path.join(os.tmpdir(), 'sessions')
        }),
        cookie: {
                secure: false,
                maxAge: 360000,
                expires: new Date(Date.now() + 360000),
                httpOnly: true
        }
})
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next)=>{
        if(req.session.userid){
                res.locals.session = req.session
        }

        next()
})

//Routes
app.use('/toughts', toughtRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)


conn.
sync()
.then(()=>{
        app.listen(3000)
})
.catch((error) => console.log(error))
