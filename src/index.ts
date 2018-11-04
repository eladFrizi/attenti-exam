import * as bodyParser from 'body-parser';
import { ClassList } from './types';
import express from 'express'
import validateClassList from './rule-engine/validateClassList';
import mapClassList from './rule-engine/mapClassList';
import { readXmlFile, parseXml } from './utils'
import { getRuleFieldValidation, getTypeFieldValdtion, getRandomValues } from './rule-engine/createVaildators';


const app = express();

const port = process.env.PORT || 3000
app.use(bodyParser.text())
app.use('/', express.static(__dirname + '/public'))

app.post('/custom', async (req, res) => {
    var userClassList = parseXml(req.body).ClassList
    const [classListType, classListRule] = await Promise.all([getClassListType(), getClassListRule()])
    const typeValdation = mapClassList(classListType, getTypeFieldValdtion)
    const ruleValidaton = mapClassList(classListRule, getRuleFieldValidation)
    res.json([
        ...validateClassList(userClassList, typeValdation),
        ...validateClassList(userClassList, ruleValidaton)
    ])
})

app.get('/types', (req, res) => {
    readXmlFile('./src/classTypes.xml')
        .then(({ ClassList }) => res.json(ClassList))
})

app.get('/rules', (req, res) => {
    readXmlFile('./src/classRules.xml')
        .then(({ RuleList }) => res.json(RuleList))
})

app.get('/random', async (req, res) => {
    const amount = +req.query.amount;
    const [classListType, classListRule] = await Promise.all([getClassListType(), getClassListRule()])
    const typeValdation = mapClassList(classListType, getTypeFieldValdtion)
    const ruleValidaton = mapClassList(classListRule, getRuleFieldValidation)
    const results: string[][] = [...Array(amount)].map(() => {
        const randomClassList = mapClassList(classListType, getRandomValues)
        return [
            ...validateClassList(randomClassList, typeValdation),
            ...validateClassList(randomClassList, ruleValidaton)
        ]
    })
    res.json(results)
})

app.listen(port, () => {
    console.log('server is running at ' + port)

})


function getClassListType(): Promise<ClassList<string>> {
    return readXmlFile('./src/classTypes.xml')
        .then(({ ClassList }) => ClassList)
}

function getClassListRule(): Promise<ClassList<string>> {
    return readXmlFile('./src/classRules.xml')
        .then(({ RuleList }) => RuleList)

}

