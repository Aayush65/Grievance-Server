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
exports.sendAdminOTPController = exports.changeAdminPasswordController = void 0;
const view_1 = require("../../views/view");
const bcryptjs_1 = require("bcryptjs");
const Admins_1 = __importDefault(require("../../models/Admins"));
const hash_1 = require("../../utils/hash");
const sendOTP_1 = __importDefault(require("../../utils/sendOTP"));
function changeAdminPasswordController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { empNo, pass, newPass } = req.body;
            if (!empNo || !pass || !newPass) {
                (0, view_1.badRequest)(res);
                return;
            }
            const empData = yield Admins_1.default.findOne({ empNo: empNo });
            if (!empData || !empData.pass) {
                (0, view_1.serverError)(res, { message: "Admin Not Found" });
                return;
            }
            if (!(yield (0, bcryptjs_1.compare)(pass, empData.pass))) {
                (0, view_1.wrongCredentials)(res);
                return;
            }
            empData.pass = yield (0, hash_1.encrypt)(newPass);
            yield empData.save();
            (0, view_1.statusOkay)(res, { message: "Password Updated Successfully" });
        }
        catch (err) {
            (0, view_1.serverError)(res, err);
        }
    });
}
exports.changeAdminPasswordController = changeAdminPasswordController;
function sendAdminOTPController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const empNo = req.params.no;
            const empData = yield Admins_1.default.findOne({ empNo }).select("email");
            if (!empData) {
                (0, view_1.notFound)(res);
                return;
            }
            const { email } = empData;
            if (!email) {
                (0, view_1.notFound)(res);
                return;
            }
            const otp = (0, hash_1.encrypt)(String(yield (0, sendOTP_1.default)(email)));
            (0, view_1.statusOkay)(res, { otp });
        }
        catch (err) {
            (0, view_1.serverError)(res, err);
        }
    });
}
exports.sendAdminOTPController = sendAdminOTPController;
