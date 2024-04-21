const WooCommerceRestApi = require("woocommerce-rest-ts-api").default;


const woo = new WooCommerceRestApi({
    url: process.env.WOOURL,
    consumerKey: process.env.WOOKEY,
    consumerSecret: process.env.WOOSEC,
    version: "wc/v3",
    // queryStringAuth: false // Force Basic Authentication as query string true and using under HTTPS
  });

module.exports = woo