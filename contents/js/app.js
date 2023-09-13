const form = document.querySelector(".form");
const loading = document.querySelector("#loading");
const resultForm = document.querySelector(".resultFormHolder");
const error = document.querySelector(".errorMsg");

loadAllEvent();

function loadAllEvent() {
  form.addEventListener("submit", function (e) {
    resultForm.style.display = "none";
    // Show loader
    loading.style.display = "block";
    //

    setTimeout(calculateResult, 2000);

    // calculateResult();
    e.preventDefault();
  });
}

function calculateResult() {
  //   grab from ui
  const uiAmount = document.querySelector("#amount");

  const uiIntrest = document.querySelector("#Intrest");

  const uiRepaymentYears = document.querySelector("#years");

  const uimonthlyPayment = document.querySelector("#monthly-payment");

  const uiTotalPayment = document.querySelector("#total-payment");

  const uiTotalIntrest = document.querySelector("#total-intrest");

  const principal = parseFloat(uiAmount.value);
  const calculatedIntrest = parseFloat(uiIntrest.value) / 100 / 12;
  const calculatedPayment = parseFloat(uiRepaymentYears.value) * 12;

  // comput monthly payment
  const x = Math.pow(1 + calculatedIntrest, calculatedPayment);
  const monthly = (principal * x * calculatedIntrest) / (x - 1);

  if (isFinite(monthly)) {
    uimonthlyPayment.textContent = monthly.toFixed(2);
    uiTotalPayment.textContent = (monthly * calculatedPayment).toFixed(2);
    uiTotalIntrest.textContent = (
      monthly * calculatedPayment -
      principal
    ).toFixed(2);
    loading.style.display = "none";
    resultForm.style.display = "block";
  } else {
    error.style.display = "inline-block";
    setTimeout(function () {
      error.style.display = "none";
    }, 3000);
    loading.style.display = "none";
  }
  //
  uiAmount.value = "";
  uiIntrest.value = "";
  uiRepaymentYears.value = "";
}
