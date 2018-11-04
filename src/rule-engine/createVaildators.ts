import moment from 'moment';
import { fieldValidationDict, fieldValidtion } from './../types';
import { removeLastAndFirstChar, getDate, getRandomString, getRandomInt, getRandomDate } from './../utils';

export function getRuleFieldValidation (rule: string): fieldValidtion{
    let [opreator, arg] = rule.split(' ')
    if (opreator === 'Contains'){
        arg = removeLastAndFirstChar(arg)
    }

    const funcs:fieldValidationDict= {
        Contains: {
            func : (str:string) => str.includes(arg),
            desc: 'Contains ' + arg
        },
        GreaterThan: {
            func : (date:string) =>  getDate(arg).isAfter(getDate(date)),
            desc: 'Greater Than ' + arg 
        }
        
    }
    return funcs[opreator]
}

export function getTypeFieldValdtion(type:string): fieldValidtion{
    const funcs:fieldValidationDict =   {
         string: {
             func: (str:any):boolean => typeof str === "string",
             desc: 'type string'
         },
         int: {
            func:  (num:any) => !isNaN(num) ,
            desc: 'type int'
         },
         DateTime: {
             func: (date:string) => getDate(date).isValid(),
             desc: 'type DateTime'
         }
     }
     return funcs[type]
 }





 export function getRandomValues(type: string): any{
     switch (type) {
         case 'string':
            return getRandomString()
         case 'int': 
            return getRandomInt(100)
         case 'DateTime':
            return getRandomDate()
     }
 }