<template>
    <div class="container">
        <div class="row justify-content-center" v-if="user != null">
            <div class="col">
                <div class="card">
                    <div class="card-header">Home</div>

                    <div class="card-body">
                        Bom dia, {{ user.name }}
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
}
</script>
