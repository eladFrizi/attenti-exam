"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const xml2json_1 = __importDefault(require("xml2json"));
const util_1 = require("util");
const moment_1 = __importDefault(require("moment"));
const readFile = util_1.promisify(fs.readFile);
exports.parseXml = (data) => JSON.parse(xml2json_1.default.toJson(data));
exports.readXmlFile = (path) => readFile(path, 'utf8')
    .then(exports.parseXml);
exports.removeLastAndFirstChar = (str) => str.substr(1).substr(0, str.length - 2);
exports.getDate = (date) => moment_1.default(date, 'DD/MM/YYYY');
exports.getRandomString = () => Math.random().toString(36).substring(7);
exports.getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
exports.getRandomDate = () => {
    const timeStamps = exports.getRandomInt(Date.now());
    return moment_1.default.unix(timeStamps).format('DD/MM/YYYY');
};
//# sourceMappingURL=utils.js.map