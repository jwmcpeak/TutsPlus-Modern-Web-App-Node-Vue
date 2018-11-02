<template>
    <div class="login">
        <h3>Login</h3>
        <form @submit.prevent="login">
            <div class="form-group">
                <input type="email" v-model="email" placeholder="Your Email" class="form-control" />
            </div>
            <div class="form-group">
                <input type="password" v-model="password" placeholder="Password" class="form-control" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="!email || !password">Login</button>
            </div>
            <div class="form-group text-danger" v-show="error">
                {{error}}
            </div>
        </form>

    </div>
</template>
<script>
import api from '../api';
import {EventBus} from '../event-bus';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    methods: {
        login() {
            api.authenticate({
                email: this.email,
                password: this.password
            }).then(data => {
                // TODO: emit a global event
                EventBus.$emit('login', data);
            }).catch(err => {
                this.error = 'There was an issue logging in.';
            })
        }
    }
}
</script>
