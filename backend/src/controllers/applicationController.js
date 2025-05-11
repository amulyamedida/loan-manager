"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllApplications = exports.getStatistics = exports.submitApplication = void 0;
const Application_1 = __importDefault(require("../models/Application"));
const submitApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newApp = new Application_1.default(req.body);
        yield newApp.save();
        res.status(201).json(newApp);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.submitApplication = submitApplication;
const getStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const total = yield Application_1.default.countDocuments();
        const average = yield Application_1.default.aggregate([{ $group: { _id: null, avgAmount: { $avg: "$amount" } } }]);
        const successCount = yield Application_1.default.countDocuments({ status: 'approved' });
        res.json({
            totalApplications: total,
            averageLoanAmount: ((_a = average[0]) === null || _a === void 0 ? void 0 : _a.avgAmount) || 0,
            successRate: total ? ((successCount / total) * 100).toFixed(2) : 0
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
});
exports.getStatistics = getStatistics;
const getAllApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apps = yield Application_1.default.find();
        res.status(200).json(apps);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching applications' });
    }
});
exports.getAllApplications = getAllApplications;
