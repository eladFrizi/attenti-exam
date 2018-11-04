export default {
    template: `
        <section class="test-criteria">
            <h1> Test Crietria </h1>
            <form @submit.prevent="$emit('amountSelected', amount)">
                <label for="test-amount" > amount: </label>
                <br>
                <input id="test-amount" type="number"  v-model="amount"/>
                <button>
                    send
                </button>
            </form>
                <input id="xml-upload" type="file" @change="baba"/>
            </form>
        </section>
    `,
    data(){
        return {
            amount: null
        }
    },
    methods:{
        baba(e){
            console.log(e)
            const file = e.target.files[0]
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const xmlFile = e.target.result
                this.$emit('xmlUploaded',xmlFile)
            }
            fileReader.readAsText(file)
        }
    }
}