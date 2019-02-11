<template>
    <div class="container">
        <div class="row justify-content-center" v-if="user != null">
            <div class="col">
                <div class="card">
                    <div class="card-header">Info do usuário</div>

                    <div class="card-body">
                        <pre class="prettyprint">
                            <code>
                                {{ user }}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Auth from "./Auth"

export default {
    props: {
    },
    extends: Auth,
    data() {
        return {
            infousu: [],
        }
    },
    mounted() {

    }
}
</script>

<style>

</style>
