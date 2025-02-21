/* eslint-disable no-undef */
export default {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || "development",
    tracesSampleRate: parseFloat(
        process.env.SENTRY_TRACES_SAMPLE_RATE || "1.0"
    ),
    integrations: [], // Will be populated in app.js
    enabled: process.env.NODE_ENV !== "test",
    debug: process.env.NODE_ENV === "development",
};
