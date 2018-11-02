<template>
    <div class="portfolio">
        <h3>Portfolio</h3>
        <button class="btn btn-primary" @click.prevent="showCreatorModal">Add Address</button>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Balance</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" 
                    :key="record.address"
                >
                    <td>{{record.currency.name}} ({{record.currency.ticker}})</td>
                    <td>{{record.address}}</td>
                    <td>{{record.balance}}</td>
                    <td>
                        <span class="currency-controls">
                            <a href="#" @click.prevent="showEditorModal(currency)">Edit</a> | 
                            <a href="#" @click.prevent="deleteCurrency(currency)">Delete</a>
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
import api from '../api';
import CurrencyCreator from '../components/admin/CurrencyCreator.vue';
import CurrencyEditor from '../components/admin/CurrencyEditor.vue';


export default {
    components: {CurrencyCreator,CurrencyEditor},
    data() {
        return {
            records: []
        };
    },
    created() {
        this.refreshPortfolio();
    },
    methods: {
        refreshPortfolio() {
            api.getPortfolio().then(data => this.records = data);
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
        },
        deleteCurrency(currency) {
            if (confirm(`Are you sure you want to delete ${currency.name} (${currency.ticker})?`)) {
                api.deleteCurrency(currency._id).then(res => {
                    let index = this.currencies.indexOf(currency);

                    this.currencies.splice(index, 1);
                });
            }
        }
    }
}
</script>


<style>
.currency-controls { visibility: hidden;}
tbody tr:hover .currency-controls { visibility: visible; }
</style>
