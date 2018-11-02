<template>
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Currency</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="coin-ticker">Ticker Symbol</label>
                        <input id="coin-ticker" v-model="ticker" type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="coin-name">Name</label>
                        <input id="coin-name" v-model="name" type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="coin-url">API URL</label>
                        <input id="coin-url" v-model="apiURL" type="text" class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click.prevent="save">Save Currency</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent="hidden">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';

export default {
    data() {
        return {
            currency: null,
            ticker: '',
            name: '',
            apiURL: ''
        };
    },
    methods: {
        show(currency) {
            this.currency = currency;
            this.ticker = currency.ticker;
            this.name = currency.name;
            this.apiURL = currency.apiURL;


            $(this.$refs['modal']).modal('show');
        },
        save() {
            this.$emit('edit-currency', {
                oldCurrency: this.currency,
                newCurrency: {
                    ticker: this.ticker,
                    name: this.name,
                    apiURL: this.apiURL
                }
            });
        },
        hide() {
            $(this.$refs['modal']).modal('hide');
        }
    }
}
</script>
