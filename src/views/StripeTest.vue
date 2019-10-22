
<script>
import {
    CardNumber,
    CardExpiry,
    CardCvc,
    createToken
} from "vue-stripe-elements-plus";

export default {
    name: "stripe test",
    components: { CardNumber, CardExpiry, CardCvc },
    data() {
        return {
            errorMessage: "",
            stripe: "",
            options: {},
            complete: false,
            number: false,
            expiry: false,
            cvc: false
        };
    },
    created() {},

    methods: {
        update() {
            this.complete = this.number && this.expiry && this.cvc;

            // field completed, find field to focus next
            if (this.number) {
                if (!this.expiry) {
                    this.$refs.cardExpiry.focus();
                } else if (!this.cvc) {
                    this.$refs.cardCvc.focus();
                }
            } else if (this.expiry) {
                if (!this.cvc) {
                    this.$refs.cardCvc.focus();
                } else if (!this.number) {
                    this.$refs.cardNumber.focus();
                }
            }
            // no focus magic for the CVC field as it gets complete with three
            // numbers, but can also have four
        },
        pay() {
            // createToken returns a Promise which resolves in a result object with
            // either a token or an error key.
            // See https://stripe.com/docs/api#tokens for the token object.
            // See https://stripe.com/docs/api#errors for the error object.
            // More general https://stripe.com/docs/stripe.js#stripe-create-token.
            createToken().then(data => console.log(data.token));
        }
    },
    watch: {
        number() {
            this.update();
        },
        expiry() {
            this.update();
        },
        cvc() {
            this.update();
        }
    }
};
</script>

<template>
    <div class="stripe-test">
        <img alt="Vue logo" src="../assets/logo.png">

        <div class="credit-card-inputs" :class="{ complete }">
            <card-number
                class="stripe-element card-number"
                ref="cardNumber"
                :stripe="stripe"
                :options="options"
                aria-placeholder="4242 4242 4242 4242"
                @change="number = $event.complete"
            />

            <card-expiry
                class="stripe-element card-expiry"
                ref="cardExpiry"
                :stripe="stripe"
                :options="options"
                @change="expiry = $event.complete"
            />
            <div class="spacer"></div>
            <card-cvc
                class="stripe-element card-cvc"
                ref="cardCvc"
                :stripe="stripe"
                :options="options"
                @change="cvc = $event.complete"
            />
        </div>
        <button @click="pay">create</button>
    </div>
</template>

<style lang="scss">
.stripe-test {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 10rem);
}

.credit-card-inputs {
    width: 30rem;
    display: flex;
    flex-wrap: wrap;

    .StripeElement {
        box-sizing: border-box;
        height: 40px;
        padding: 10px 12px;
        border-radius: 0px;
        background-color: white;
        border-bottom: 1px solid #cfd7df;
        box-shadow: 0 0 0 0 #cfd7df;
    }

    .StripeElement--focus {
        box-shadow: 0 0 0 0 #cfd7df;
        border-bottom-color: #fa755a;
    }

    .StripeElement--invalid {
        background-color: #ff000011;
        border-color: transparent;
    }

    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }
    .stripe-element {
        margin-bottom: 0.5rem;
    }
    .card-number {
        width: 100%;
    }

    .card-expiry {
        // background-color: transparent !important
        width: 6rem;
    }
    .card-cvc {
        width: 6rem;
        text-align: center;
    }

    .spacer {
        width: 0.5rem;
    }
}
</style>

