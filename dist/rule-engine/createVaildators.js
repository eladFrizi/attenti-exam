"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./../utils");
function getRuleFieldValidation(rule) {
    let [opreator, arg] = rule.split(' ');
    if (opreator === 'Contains') {
        arg = utils_1.removeLastAndFirstChar(arg);
    }
    const funcs = {
        Contains: {
            func: (str) => str.includes(arg),
            desc: 'Contains ' + arg
        },
        GreaterThan: {
            func: (date) => utils_1.getDate(arg).isAfter(utils_1.getDate(date)),
            desc: 'Greater Than ' + arg
        }
    };
    return funcs[opreator];
}
exports.getRuleFieldValidation = getRuleFieldValidation;
function getTypeFieldValdtion(type) {
    const funcs = {
        string: {
            func: (str) => typeof str === "string",
            desc: 'type string'
        },
        int: {
            func: (num) => !isNaN(num),
            desc: 'type int'
        },
        DateTime: {
            func: (date) => utils_1.getDate(date).isValid(),
            desc: 'type DateTime'
        }
    };
    return funcs[type];
}
exports.getTypeFieldValdtion = getTypeFieldValdtion;
function getRandomValues(type) {
    switch (type) {
        case 'string':
            return utils_1.getRandomString();
        case 'int':
            return utils_1.getRandomInt(100);
        case 'DateTime':
            return utils_1.getRandomDate();
    }
}
exports.getRandomValues = getRandomValues;
//# sourceMappingURL=createVaildators.js.map