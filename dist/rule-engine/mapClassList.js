"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signleClassMap = (single, fieldMapper) => Object.entries(single)
    .reduce((acc, [key, val]) => {
    acc[key] = fieldMapper(val);
    return acc;
}, {});
// the function itreate over the classList and know how build a validator according to the second parameter. 
const mapClassList = (list, fieldMapper) => Object.entries(list)
    .reduce((acc, [className, currClass]) => {
    acc[className] = signleClassMap(currClass, fieldMapper);
    return acc;
}, {});
exports.default = mapClassList;
//# sourceMappingURL=mapClassList.js.map