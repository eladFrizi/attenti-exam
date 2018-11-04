"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const validateClassList_1 = __importDefault(require("./rule-engine/validateClassList"));
const mapClassList_1 = __importDefault(require("./rule-engine/mapClassList"));
const utils_1 = require("./utils");
const createVaildators_1 = require("./rule-engine/createVaildators");
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(bodyParser.text());
app.use('/', express_1.default.static(__dirname + '/public'));
app.post('/custom', (req, res) => __awaiter(this, void 0, void 0, function* () {
    var userClassList = utils_1.parseXml(req.body).ClassList;
    const [classListType, classListRule] = yield Promise.all([getClassListType(), getClassListRule()]);
    const typeValdation = mapClassList_1.default(classListType, createVaildators_1.getTypeFieldValdtion);
    const ruleValidaton = mapClassList_1.default(classListRule, createVaildators_1.getRuleFieldValidation);
    res.json([
        ...validateClassList_1.default(userClassList, typeValdation),
        ...validateClassList_1.default(userClassList, ruleValidaton)
    ]);
}));
app.get('/types', (req, res) => {
    utils_1.readXmlFile('./src/classTypes.xml')
        .then(({ ClassList }) => res.json(ClassList));
});
app.get('/rules', (req, res) => {
    utils_1.readXmlFile('./src/classRules.xml')
        .then(({ RuleList }) => res.json(RuleList));
});
app.get('/random', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const amount = +req.query.amount;
    const [classListType, classListRule] = yield Promise.all([getClassListType(), getClassListRule()]);
    const typeValdation = mapClassList_1.default(classListType, createVaildators_1.getTypeFieldValdtion);
    const ruleValidaton = mapClassList_1.default(classListRule, createVaildators_1.getRuleFieldValidation);
    const results = [...Array(amount)].map(() => {
        const randomClassList = mapClassList_1.default(classListType, createVaildators_1.getRandomValues);
        return [
            ...validateClassList_1.default(randomClassList, typeValdation),
            ...validateClassList_1.default(randomClassList, ruleValidaton)
        ];
    });
    res.json(results);
}));
app.listen(port, () => {
    console.log('server is running at ' + port);
});
function getClassListType() {
    return utils_1.readXmlFile('./src/classTypes.xml')
        .then(({ ClassList }) => ClassList);
}
function getClassListRule() {
    return utils_1.readXmlFile('./src/classRules.xml')
        .then(({ RuleList }) => RuleList);
}
//# sourceMappingURL=index.js.map