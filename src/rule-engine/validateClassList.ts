import {  fieldValidtion, ClassList, SingleClass } from './../types';


const checkClass = (c:SingleClass<any>, validator:SingleClass<fieldValidtion>,className:string): string[] => {
    return Object.entries(validator)
                .reduce((acc:string[], [key, fieldValidtion]) => {
                        const isValid =  fieldValidtion.func(c[key])
                        const msg = `${className} - ${key} - ${fieldValidtion.desc} - ${isValid ? 'pass' : 'falied'} - value is : ${c[key]}`
                        acc.push(msg)
                        return acc
                    }, [])
}



    


// this function get  classList and validator iterate over them.
// the funtion check each field and return true if all the test pass.
const validateClassList = (classList: ClassList<any>, validator: ClassList<fieldValidtion>): string[] => {
    return Object.entries(classList)
                .reduce((acc:string[], [className,currClass]) => {
                    return validator[className] ?
                                [...acc, ...checkClass(currClass,validator[className], className)] :
                                acc

                },[])
}

export default validateClassList
