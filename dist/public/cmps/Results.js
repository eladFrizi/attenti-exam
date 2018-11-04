export default {
    template: `
        <section class="results">
            <h1> Results </h1>
            <div v-for="(fields,index) of tests">
                <details>
                    <summary>
                    test case {{index + 1}} 
                    </summary>
                    <div v-for="field of fields">
                        {{field}}
                    </div>
                </details>
            </div>
        </section>
    `,
    props: ['tests']
}