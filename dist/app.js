"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const job_routes_1 = require("./routes/job.routes");
const application_routes_1 = require("./routes/application.routes");
const auth_routes_1 = require("./routes/auth.routes");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
// origin: ['http://localhost:5173'], // replace with your frontend URL
// credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use("/job", job_routes_1.jobRoutes);
app.use("/job-application", application_routes_1.applicationRoutes);
app.use("/", auth_routes_1.authRoutes);
app.get("/", (req, res) => {
    res.send("All job is here for you");
});
exports.default = app;
