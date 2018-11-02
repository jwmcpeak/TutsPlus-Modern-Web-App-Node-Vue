<template>
    <div class="currencies">
        <h3>Currencies</h3>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Ticker</th>
                    <th>URL</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="currency in currencies" 
                    :data-currency-id="currency._id" 
                    :key="currency._id"
                >
                    <td>{{currency.name}}</td>
                    <td>{{currency.tickler}}</td>
                    <td>{{currency.apiURL}}</td>
                    <td>
                        <span class="currency-controls">
                            <a href="#">Edit</a> | 
                            <a href="#">Delete</a>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import api from '../../api';

export default {
    data() {
        return {
            currencies: []
        };
    },
    methods: {
        refreshList() {
            api.getCurrencies().then(data => this.currencies = data);
        }
    }
}
</script>


<style>
.currency-controls { visibility: hidden;}
tbody tr:hover .currency-controls { visibility: visible; }
</style>
