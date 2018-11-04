import { ClassList, SingleClass } from './../types';




const  signleClassMap = <T>(single:SingleClass<any>, fieldMapper:(Function:any)=>T): SingleClass<T> => 
    Object.entries(single)
        .reduce((acc:SingleClass<T>, [key, val]) => {
            acc[key] = fieldMapper(val)
            return acc
        }, {})



// the function itreate over the classList and know how build a validator according to the second parameter. 
const mapClassList = <T>(list:ClassList<any>, fieldMapper:(Function:any) =>T): ClassList<T> => 
    Object.entries(list)
        .reduce((acc:ClassList<T>, [className , currClass] )=>{
            acc[className] = signleClassMap(currClass,fieldMapper )
            return acc
        },{})


export default mapClassList

