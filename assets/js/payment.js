
/**
 * @type Object<string, {flat: true | undefined, percentage: true|undefined, amount: number}>
 */
const coupons = {
  "CODE_1": { flat: true, amount: 100 * 100 }, //In Paisa 100 * 100 = 100 INR
  "CODE_2": { percentage: true, amount: .10 }, //10%
}

const options = {
  "key": "rzp_test_t2MfqqazmOUfOr", // Enter the Key ID generated from the Dashboard
  //amount
  "currency": "INR",
  "name": "TEDX NIT Srinagar", //your business name
  "description": "Event Ticket",
  "image": "https://tedx.nitsri.ac.in/assets/img/logo-white.png",
  //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //notes: {"note": "description"}
  "handler": function(response) { },
  "theme": {
    "color": "#3399cc"
  }
};


document.getElementById('payment-form').onsubmit = function(e) {
  e.preventDefault();
  const baseValue = Number(document.getElementById("base-value").value) * 100;
  const couponCode = document.getElementById("coupon").value;
  const coupon = coupons[couponCode];
  let finalAmount = baseValue;
  let notes = undefined;

  if (coupon?.flat) {
    finalAmount = baseValue - coupon.amount
    notes = { "Coupon": couponCode, "Discount": `Discount of ${coupon.amount / 100} applied` }
  } else if (coupon?.percentage) {
    finalAmount = baseValue - baseValue * coupon.amount
    notes = { "Coupon": couponCode, "Discount": `Discount of ${(coupon.amount * baseValue) / 100} applied` }
  }

  options.amount = finalAmount
  options.notes = notes


  var rpay = new Razorpay(options);
  rpay.on('payment.failed', function(response) { alert("Payment failed") });
  rpay.open();
}
