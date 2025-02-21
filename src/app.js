// eslint-disable-next-line no-undef
require("./instrument.js");

import express from "express";
<<<<<<< HEAD
import "express-async-errors";
import * as Sentry from "@sentry/node";
import Youch from "youch";
=======
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
>>>>>>> 034cb5103839edd01172d6c638e0a18cf8d16dbe
import routes from "./routes";
import "dotenv/config";
import "./database";
import sentryConfig from "./config/sentry";

import sentryConfig from "./config/sentry";

class App {
    constructor() {
        this.server = express();

<<<<<<< HEAD
        Sentry.init(sentryConfig);

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(Sentry.Handlers.requestHandler());
        this.server.use(Sentry.Handlers.tracingHandler());
=======
        // Initialize Sentry before anything else
        this.initSentry();
        
        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    initSentry() {
        // Only initialize if DSN is provided
        if (sentryConfig.dsn) {
            sentryConfig.integrations = [
                new Sentry.Integrations.Http({ tracing: true }),
                new Tracing.Integrations.Express({ app: this.server }),
            ];
            Sentry.init(sentryConfig);
        }
    }

    middlewares() {
        // Initialize Sentry request handler first if Sentry is configured
        if (sentryConfig.dsn) {
            this.server.use(Sentry.Handlers.requestHandler());
            this.server.use(Sentry.Handlers.tracingHandler());
        }

>>>>>>> 034cb5103839edd01172d6c638e0a18cf8d16dbe
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.server.use(routes);
        this.server.use(Sentry.Handlers.errorHandler());
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            // eslint-disable-next-line no-undef
            if (process.env.NODE_ENV === "development") {
                const errors = await new Youch(err, req).toJSON();
                return res.status(500).json(errors);
            }

            return res.status(500).json({ error: "Internal server error" });
        });
    }

    exceptionHandler() {
        if (sentryConfig.dsn) {
            // The Sentry error handler must be before any other error middleware
            this.server.use(Sentry.Handlers.errorHandler());
        }

        // Optional fallback error handler
        this.server.use((err, req, res, next) => {
            const status = err.status || 500;
            const message = err.message || 'Internal Server Error';
            
            return res.status(status).json({
                status: 'error',
                message
            });
        });
    }
}

export default new App().server;
