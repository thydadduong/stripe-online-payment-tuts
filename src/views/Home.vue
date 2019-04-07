<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">

        <button id="checkout-button" role="link" @click="stripePay">Pay</button>
        <div id="error-message">{{errorMessage}}</div>
    </div>
</template>

<script>
export default {
    name: "home",
    components: {},
    data(){
      return{
        errorMessage:""
      }
    },
    created() {
        console.log(window);
    },
    methods: {
        stripePay() {
          console.log("clicked");
          
            const stripe = window.Stripe(
                "pk_test_PhVTXCyQHFddlKPzdQjiP9QU00HTk5E4iw",
                {
                    betas: ["checkout_beta_4"]
                }
            );

            stripe
                .redirectToCheckout({
                    items: [{ sku: "sku_Eq87qQxHLP3qww", quantity: 1 }],
                    successUrl: "http://localhost:8080/succeed",
                    cancelUrl: "http://localhost:8080/canceled"
                })
                .then(function(result) {
                  console.log(result);
                  
                    if (result.error) {
                        // If `redirectToCheckout` fails due to a browser or network
                        // error, display the localized error message to your customer.
                        this.errorMessage = result.error.message;
                    }
                });
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
</style>

