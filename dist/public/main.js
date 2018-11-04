
import ClassInformation from './cmps/ClassInformation.js'
import Results from './cmps/Results.js'
import TestCriteria from './cmps/TestCriteria.js'

new Vue({
    el: "#app",
    template: `<div class="container">
                    <div class="type-information">
                        <h1> type information</h1>
                        <ClassInformation rule-set="types">
                                <tr slot="table-header">
                                    <th>class name</th>
                                    <th>field</th>
                                    <th> type </th>
                                </tr>
                                <tr slot="table-row" slot-scope="{className, fieldName, fieldTest}">
                                    <td>{{className}}</td>
                                    <td>{{fieldName}}</td>
                                    <td>{{fieldTest}}</td>
                                </tr>
                        </ClassInformation>
                    </div>
                    <div class="rule-information">
                        <h1> rule information </h1>
                        <ClassInformation rule-set="rules">
                            <tr slot="table-header">
                                <th>class name</th>
                                <th>field</th>
                                <th> opreator</th>
                                <th> arg</th>
                            </tr>
                            <tr slot="table-row" slot-scope="{className, fieldName, fieldTest}">
                                <td>{{className}}</td>
                                <td>{{fieldName}}</td>
                                <td>{{fieldTest.split(' ')[0]}}</td>
                                <td>{{fieldTest.split(' ')[1]}}</td>
                            </tr>
                        </ClassInformation>
                    </div>
                    <Results :tests="tests"/>
                    <TestCriteria @amountSelected="getRandomTest" @xmlUploaded="baba"/>
              </div>`,
    data(){
        return {
            tests: []
        }
    },
    methods: {
        baba(xmlFile){
            axios({
                method : 'post',
                url: '/custom',
                data: xmlFile,
                headers: {'Content-Type': 'text/plain'}
            })
            .then(res => {
                this.tests = [res.data]
            })
        },
        getRandomTest(num){
            axios('/random?amount='+num)
                .then(res =>{
                    this.tests = res.data
                })
        }
    },
    components: {
        ClassInformation,
        Results,
        TestCriteria
    }
})