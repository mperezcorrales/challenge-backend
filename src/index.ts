import * as compression from 'compression';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as winston from 'winston';
import * as cors from 'cors';
import appRoutes from './routes';
import { SERVER_PORT, SERVER_HOST } from './env';

const app = express();
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf((info) => {
            return `${info.timestamp} - ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/logfile.log' })
    ]
});

app.use(compression()); // Decreases the downloadable amount of data that’s served to users
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.json());
app.use(methodOverride()); // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

app.use('/api', appRoutes);

app.listen(SERVER_PORT, () => {
    logger.log('info', `Server Port: ${SERVER_PORT}`);
    logger.log('info', `Server URL: http://${SERVER_HOST}:${SERVER_PORT}`);
});