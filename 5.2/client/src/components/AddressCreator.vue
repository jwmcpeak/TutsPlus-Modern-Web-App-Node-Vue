<template>
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Address</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="currency">Currency</label>
                        <select name="currency" id="currency" 
                                class="form-group"
                                v-model="selectedCurrency"
                        >
                            <option v-for="currency in currencies" 
                                    :key="currency._id"
                                    :value="currency._id"
                            >{{currency.name}} ({{currency.ticker}})</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input id="address" v-model="address" type="text" class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click.prevent="save">Save Address</button>
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
            selectedCurrency: null,
            currencies: [],
            address: ''
        };
    },
    methods: {
        show() {
            api.getPortfolioCurrencies().then(data => {
                this.currencies = data;

                $(this.$refs['modal']).modal('show');
            });
        },
        save() {
            this.$emit('create-address', {
                currency: this.selectedCurrency,
                address: this.address
            });
        },
        hide() {
            $(this.$refs['modal']).modal('hide');
        }
    }
}
</script>
