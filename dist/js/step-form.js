var currentStep = 0;
let progressStep = 0;
var steps = document.querySelectorAll(".step");
var progressBar = document.querySelector("#progress-bar");
var progressPercentage = document.querySelector("#progress-bar-percentage");

function updateProgress() {
  var percent = (progressStep / (steps.length - 1)) * 100;
  progressBar.style.width = percent.toFixed(0) + "%";
  countUp("progress-bar-percentage", 500, percent.toFixed(0));
}

updateProgress();

function countUp(target, duration, endValue) {
  const element = document.getElementById(target);
  const startValue = parseInt(element.innerHTML);
  const increment = (endValue - startValue) / (duration / 10);
  let current = startValue;

  const timer = setInterval(() => {
    current += increment;
    element.innerHTML = Math.ceil(current) + "%";

    if (current >= endValue) {
      clearInterval(timer);
      element.innerHTML = endValue + "%";
    }
  }, 10);
}

const buttonsDiv = document.querySelector(".progress-buttons");
const nextBtn = document.querySelector("#next-button");
const prevBtn = document.querySelector("#prev-button");
const submitBtn = document.querySelector("#submit-button");

function next() {
  if (currentStep < steps.length - 1) {
    steps[currentStep].classList.remove("active");
    currentStep++;
    if (currentStep !== 0) {
      prevBtn.classList.remove("disabled");
      buttonsDiv.classList.add("after-step-1");
    }
    if (currentStep === steps.length - 2) {
      nextBtn.classList.add("disabled");
      submitBtn.style.display = "block";
      nextBtn.style.display = "none";
    }
    if (currentStep === steps.length - 1) {
      submitBtn.style.display = "none";
      prevBtn.style.display = "none";
    }
    if (currentStep > progressStep) {
      progressStep++;
    }
    if (currentStep < progressStep) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
    steps[currentStep].classList.add("active");
    updateProgress();
    if (steps[currentStep].getElementsByTagName("input")[0]) {
      steps[currentStep].getElementsByTagName("input")[0].focus();
    } else {
      steps[currentStep].getElementsByTagName("textarea")[0].focus();
    }
  }
}

function prev() {
  if (currentStep !== 0) {
    steps[currentStep].classList.remove("active");
    currentStep--;
    if (currentStep === 0) {
      prevBtn.classList.add("disabled");
      buttonsDiv.classList.remove("after-step-1");
    }
    if (currentStep !== steps.length - 2) {
      nextBtn.classList.remove("disabled");
      submitBtn.style.display = "none";
      nextBtn.style.display = "block";
    }
    nextBtn.disabled = false;
    steps[currentStep].classList.add("active");
    updateProgress();
    if (steps[currentStep].getElementsByTagName("input")[0]) {
      steps[currentStep].getElementsByTagName("input")[0].focus();
    } else {
      steps[currentStep].getElementsByTagName("textarea")[0].focus();
    }
  }
}

// #step1 seçim sınırlayıcı
const stepOneCheckbox = document.querySelectorAll("#step1 input[type=checkbox]");
const maxSelect = 10;

for (let i = 0; i < stepOneCheckbox.length; i++) {
  stepOneCheckbox[i].addEventListener("click", (e) => {
    const checkedCount = document.querySelectorAll("#step1 input[type=checkbox]:checked").length;
    if (checkedCount === 0) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
    if (checkedCount >= maxSelect) {
      for (let j = 0; j < stepOneCheckbox.length; j++) {
        if (!stepOneCheckbox[j].checked) {
          stepOneCheckbox[j].disabled = true;
        }
      }
    } else {
      for (let j = 0; j < stepOneCheckbox.length; j++) {
        stepOneCheckbox[j].disabled = false;
        if (e.key === "Enter") {
          next();
        }
      }
    }
  });
}

// Submit komutunu engeller
var form = document.querySelector("#step-form");

form.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

// #step2 textbox kontrol
const step2Textbox = document.querySelector("#step2 input[type='text']");

step2Textbox.addEventListener("keydown", (e) => {
  setTimeout(() => {
    if (step2Textbox.value.length < 2) {
      nextBtn.disabled = true;
      step2Textbox.classList.add("warning");
      document.querySelector("#step2 div.warning-text").classList.add("active");
      progressStep = currentStep;
    } else {
      nextBtn.disabled = false;
      step2Textbox.classList.remove("warning");
      document.querySelector("#step2 div.warning-text").classList.remove("active");
      if (e.key === "Enter") {
        next();
      }
    }
  }, 10);
});

// #step3 email kontrol
const step3Email = document.querySelector("#step3 input[type='email']");

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

step3Email.addEventListener("keydown", (e) => {
  setTimeout(() => {
    if (!isValidEmail(step3Email.value)) {
      nextBtn.disabled = true;
      progressStep = currentStep;
      step3Email.classList.add("warning");
      document.querySelector("#step3 div.warning-text").classList.add("active");
      return;
    } else {
      nextBtn.disabled = false;
      step3Email.classList.remove("warning");
      document.querySelector(`#step3 div.warning-text`).classList.remove("active");
      if (e.key === "Enter") {
        next();
      }
    }
  }, 10);
});

// #step4 textbox kontrol
const step4Textbox = document.querySelector("#step4 input[type='text']");
step4Textbox.maxLength = 11;
step4Textbox.addEventListener("keydown", (e) => {
  if (
    e.key === "Delete" ||
    e.key === "Backspace" ||
    e.key === "Enter" ||
    (e.key >= "0" && e.key <= "9") // numeric keys
  ) {
    setTimeout(() => {
      if (step4Textbox.value.length < 11) {
        nextBtn.disabled = true;
        progressStep = currentStep;
        step4Textbox.classList.add("warning");
        document.querySelector("#step4 div.warning-text").classList.add("active");
      } else {
        nextBtn.disabled = false;
        step4Textbox.classList.remove("warning");
        document.querySelector("#step4 div.warning-text").classList.remove("active");
        if (e.key === "Enter") {
          next();
        }
      }
    }, 10);
  } else {
    e.preventDefault();
  }
});
