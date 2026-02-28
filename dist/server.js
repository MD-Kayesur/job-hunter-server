"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 4000;
async function startServer() {
    try {
        const client = await (0, db_1.connectDB)();
        if (client) {
            app_1.default.listen(port, () => {
                console.log(`Server is running at http://localhost:${port}`);
            });
        }
    }
    catch (err) {
        console.error("Failed to start server:", err);
    }
}
startServer();
