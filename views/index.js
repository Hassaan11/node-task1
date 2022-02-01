// const stripe = stripe(
//     "pk_test_51JMFxiSDJaeDh8bHKHYaDbufhLsORcDVPZLgzVsfoquVIYh8lZUSjp28rthc11NmwZZf6y3cCB81EI6SI9kfC53N00lugdTiPa"
// ); // Your Publishable Key
// const elements = stripe.elements();

const form = document.getElementsByClassName("form");
console.log("form form", form);

const myul = document.getElementsByClassName("myul");
console.log("myul myul", myul);

// const stripeTokenHandler = (token) => {
//     const hiddenInput = document.createElement("input");
//     hiddenInput.setAttribute("type", "hidden");
//     hiddenInput.setAttribute("name", "stripeToken");
//     hiddenInput.setAttribute("value", token.id);
//     form.appendChild(hiddenInput);

//     form.submit();
// };

// Create token from card data
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log("form form", form);
//     stripe.createToken(card).then((res) => {
//         if (res.error) errorEl.textContent = res.error.message;
//         else stripeTokenHandler(res.token);
//     });
// });