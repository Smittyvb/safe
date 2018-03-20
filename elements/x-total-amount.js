import XElement from '/libraries/x-element/x-element.js';
import NanoApi from '/libraries/nano-api/nano-api.js';
import MixinRedux from '/elements/mixin-redux/mixin-redux.js';

export default class XTotalAmount extends MixinRedux(XElement) {
    html(){
        return `
        <span class="text">Total balance</span>
            <x-currency-nim>
                <span class="dot-loader white"></span>
            </x-currency-nim>
        `
    }

    onCreate(){
        super.onCreate();
        this.$currencyNim = this.$('x-currency-nim');
    }

    static mapStateToProps(state) {
        return {
            accounts: state.accounts.entries
        };
    }

    _onPropertiesChanged(changes) {
        const { accounts } = this.properties;

        if (accounts.size === 0) {
            this.value = 0;
            return;
        }

        const value = [...accounts.values()].reduce((acc, account) => account.balance, 0);

        // Only update when all accounts have their balance loaded
        if (!isNaN(value)) this.value = value;
    }

    set value(value) {
        value = Number(value);
        this.$currencyNim.textContent = (NanoApi.formatValue(value, 3) || '') + ' NIM';
    }
}