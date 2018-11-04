"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkClass = (c, validator, className) => {
    return Object.entries(validator)
        .reduce((acc, [key, fieldValidtion]) => {
        const isValid = fieldValidtion.func(c[key]);
        const msg = `${className} - ${key} - ${fieldValidtion.desc} - ${isValid ? 'pass' : 'falied'} - value is : ${c[key]}`;
        acc.push(msg);
        return acc;
    }, []);
};
// this function get  classList and validator iterate over them.
// the funtion check each field and return true if all the test pass.
const validateClassList = (classList, validator) => {
    return Object.entries(classList)
        .reduce((acc, [className, currClass]) => {
        return validator[className] ?
            [...acc, ...checkClass(currClass, validator[className], className)] :
            acc;
    }, []);
};
exports.default = validateClassList;
//# sourceMappingURL=validateClassList.js.map