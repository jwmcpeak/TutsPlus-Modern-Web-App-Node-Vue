<template>
    <div class="currencies">
        <h3>Currencies</h3>
        <button class="btn btn-primary" @click.prevent="showCreatorModal">Add Currency</button>
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
                    <td>{{currency.ticker}}</td>
                    <td>{{currency.apiURL}}</td>
                    <td>
                        <span class="currency-controls">
                            <a href="#" @click.prevent="showEditorModal(currency)">Edit</a> | 
                            <a href="#">Delete</a>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <currency-creator ref="creator" v-on:save-currency="saveNew"></currency-creator>
        <currency-editor ref="editor" v-on:edit-currency="saveEdit"></currency-editor>
    </div>
</template>
<script>
import api from '../../api';
import CurrencyCreator from '../../components/admin/CurrencyCreator.vue';
import CurrencyEditor from '../../components/admin/CurrencyEditor.vue';


export default {
    components: {CurrencyCreator,CurrencyEditor},
    data() {
        return {
            currencies: []
        };
    },
    created() {
        this.refreshCurrencies();
    },
    methods: {
        refreshCurrencies() {
            api.getCurrencies().then(data => this.currencies = data);
        },
        showCreatorModal() {
            this.$refs['creator'].show();
        },
        showEditorModal(currency) {
            this.$refs['editor'].show(currency);
        },
        saveNew(currency) {
            api.createCurrency(currency).then(data => {
                this.refreshCurrencies();
                this.$refs['creator'].hide();

            });
        },
        saveEdit(editData) {
            api.editCurrency(editData).then(data => {
                let currency = editData.oldCurrency;
                let newValues = editData.newCurrency;

                currency.ticker = newValues.ticker;
                currency.name = newValues.name;
                currency.apiURL = newValues.apiURL;



                this.$refs['editor'].hide();

            });
        }
    }
}
</script>


<style>
.currency-controls { visibility: hidden;}
tbody tr:hover .currency-controls { visibility: visible; }
</style>
