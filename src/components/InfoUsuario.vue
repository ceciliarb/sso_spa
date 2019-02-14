<template>
    <div class="container">
        <div class="row justify-content-center" v-if="$store.getters.isAuthenticated">
            <div class="col">
                <div class="card">
                    <div class="card-header">Info do usuário</div>

                    <div class="card-body">
                        <pre class="prettyprint">
                            <code>
                                {{ $store.getters.user }}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
    },
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
