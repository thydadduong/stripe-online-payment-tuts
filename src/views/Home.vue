<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <div class="payment-card">
            <form @submit="onSubmit" id="payment-form">
                <!-- <div class="form-row"> -->
                <label for="card-element">Credit or debit card</label>
                <div id="card-element">
                    <!-- A Stripe Element will be inserted here. -->
                </div>

                <!-- Used to display form errors. -->
                <div id="card-errors" role="alert"></div>
                <!-- </div> -->

                <button>Submit Payment</button>
            </form>
        </div>
        <br>
        <br>
        <div id="example2-card-number"></div>
        <div id="example2-card-number"></div>
    </div>
</template>

<script>
// Create a Stripe client.
var stripe = window.Stripe("");

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
    base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
            color: "#aab7c4"
        }
    },
    invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
    }
};

// Create an instance of the card Element.
var card = elements.create("card", { style: style });

export default {
    name: "home",
    components: {},
    data() {
        return {
            errorMessage: ""
        };
    },
    created() {
        console.log(window);
    },
    mounted() {
        card.mount("#card-element");
        // Handle real-time validation errors from the card Element.
        card.addEventListener("change", function(event) {
            var displayError = document.getElementById("card-errors");
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = "";
            }
        });
        console.log(card);
    },

    methods: {
        stripePay() {},
        purchase() {},
        getCardToken() {
            stripe.tokens.create(card, function(err, token) {
                // asynchronously called
                console.log(token);
            });
        },
        onSubmit(event) {
            event.preventDefault();
            let _this = this;

            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    // Inform the user if there was an error.
                    var errorElement = document.getElementById("card-errors");
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server.
                    _this.stripeTokenHandler(result.token);
                }
            });
        },
        stripeTokenHandler(token) {
            console.log(token);

            // let stripeApi = window.Stripe(
            //     ""
            // );
            // stripeApi.charges.create(
            //     {
            //         amount: 2000,
            //         currency: "usd",
            //         source: token, // obtained with Stripe.js
            //         description: "Charge for jenny.rosen@example.com"
            //     },
            //     function(err, charge) {
            //         // asynchronously called
            //         console.log(err);
            //         console.log(charge);
            //     }
            // );
        }
    }
};
</script>

<style>
.home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: lightgray;
    min-height: calc(100vh - 10rem);
}

.StripeElement {
    box-sizing: border-box;

    height: 40px;

    padding: 10px 12px;

    border: 1px solid transparent;
    border-radius: 4px;
    background-color: white;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
}
.payment-card {
    width: 30rem;
}
.StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
    border-color: #fa755a;
}

.StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
}
</style>

