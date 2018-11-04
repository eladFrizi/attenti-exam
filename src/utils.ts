import * as  fs from 'fs'
import  xmlParser from 'xml2json'
import  {promisify} from 'util'
import moment from 'moment'
import { ClassList}from './types'


const readFile = promisify(fs.readFile)





export const parseXml = (data:string): any => JSON.parse(xmlParser.toJson(data))

export const readXmlFile = (path:string): Promise<{[key: string]: ClassList<any>}> =>  
                            readFile(path,'utf8')
                            .then(parseXml)


export const removeLastAndFirstChar = (str:string): string => str.substr(1).substr(0,str.length -2)


export const getDate = (date:string) => moment(date,'DD/MM/YYYY')


export  const getRandomString =  () =>  Math.random().toString(36).substring(7);
export const getRandomInt = (max:number) => Math.floor(Math.random() * Math.floor(max));
export const getRandomDate = () => {
    const timeStamps = getRandomInt(Date.now())
    return moment.unix(timeStamps).format('DD/MM/YYYY')
}
