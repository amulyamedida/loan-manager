"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicationController_1 = require("../controllers/applicationController");
const router = express_1.default.Router();
router.post('/api/applications', applicationController_1.submitApplication);
router.get('/api/applications', applicationController_1.getStatistics);
router.get('/applications', applicationController_1.getAllApplications);
exports.default = router;
