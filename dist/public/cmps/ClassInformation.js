export default {
    template: `
    <div class="class-information">
            <table>
                <thead>
                    <slot name="table-header">
                    </slot>
                </thead>
                <tbody v-if="classListTest">
                    <template v-for="(classTest, className) in classListTest">
                        <template v-for="(fieldTest, fieldName) in classTest">
                            <slot :className="className" :fieldName="fieldName" :fieldTest="fieldTest" name="table-row">
                                <tr>
                                    <td> {{className}} </td>
                                    <td> {{fieldName}} </td>
                                    <td>{{fieldTest}}</td>
                                </tr>
                            </slot>
                        </template>
                    </template>
                </tbody>
            </table>
    </div>
    `,
    data(){
        return {
            classListTest: null
        }
    },
    props:{
        ruleSet: String
    },
    mounted(){
        axios.get('/'+this.ruleSet).then((res) => {
            this.classListTest= res.data
        })
    }
}