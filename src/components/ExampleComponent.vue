<template>
    <div class="container">
        <div class="row justify-content-center" v-if="$store.getters.isAuthenticated">
            <div class="col">
                <div class="card">
                    <div class="card-header">Home</div>

                    <div class="card-body">
                        Bom dia, {{ $store.getters.user.name }}
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
}
</script>
