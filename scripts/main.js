"use strict";

window.onload = () => {
  // ===================init menu burger================
  (function menuInit() {
    if (document.querySelector(".icon-menu")) {
      document.addEventListener("click", function (e) {
        if (e.target.closest(".icon-menu")) {
          document.documentElement.classList.toggle("menu-open");
          document.body.classList.toggle("lock");
        } else {
          document.documentElement.classList.remove("menu-open");
          document.body.classList.remove("lock");
        }
      });
    }
  })();
  //============= form ========================
  const form = document.getElementById("form");

  // add and remove placeholder
  form.addEventListener("focusin", (e) => {
    if (e.target.tagName === "INPUT") {
      e.target.placeholder = "";
    }
  });
  form.addEventListener("focusout", (e) => {
    if (e.target.tagName === "INPUT") {
      e.target.placeholder = e.target.dataset.placeholder;
    }
  });
  //============= validation form ========================

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const requireFields = document.querySelectorAll(".required");

    let error = 0;
    for (let i = 0; i < requireFields.length; i++) {
      let input = requireFields[i];
      removeErrorMessage(input);
      if (input.value == "") {
        addErrorMessage(input);
        error++;
      } else {
        if (input.id == "email") {
          if (emailValidation(input)) {
            addErrorMessage(input, "Input valid email");
            error++;
          }
        }
      }
    }
    if (!error) {
      formSubmit();
    }
    return error;
  });

  function addErrorMessage(input, message = "Fill out required fields") {
    input.classList.add("error");
    input.parentElement.insertAdjacentHTML(
      "beforeend",
      `<p class="form-error">${message}</p>`
    );
  }
  function removeErrorMessage(input) {
    input.classList.remove("error");
    if (input.parentElement.querySelector(".form-error")) {
      input.parentElement.removeChild(
        input.parentElement.querySelector(".form-error")
      );
    }
  }
  function emailValidation(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  async function formSubmit() {
    const inputVal = () => {
      const input = document.getElementById("name").value;
      return input;
    };
    let value = inputVal();
    form.reset();
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="form-submit">
				<p>Hi ${value} </p>
				<p>Yuor message is submited</p>
			</div>`
    );
    setTimeout(() => {
      form.removeChild(form.querySelector(".form-submit"));
    }, 3000);
  }
  // ======================init swiper=================
  const swiperThumb = new Swiper(".classes__slider-thumbs", {
    // Optional parameters
    direction: "vertical",
    slidesPerView: 7,
    spaceBetween: 10,

    watchSlidesProgress: true,
  });
  const swiperMain = new Swiper(".classes__slider", {
    // Optional parameters
    centeredSlides: true,
    effect: "coverflow",
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    speed: 800,
    additionalSlide: 1,
    spaceBetween: 10,
    coverflow: {
      rotate: 0,
      stretch: 100,
      depth: 50,
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      // when window width is >= 480px
      480: {
        slidesPerView: 1.5,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2.2,
        spaceBetween: 30,
        coverflow: {
          rotate: 40,
          stretch: 100,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
      },
    },
    pagination: {
      el: ".classes__pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiperThumb,
    },
  });
  // ======================calculator=====================

  const calculator__form = document.getElementById("calculator__form");

  calculator__form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    let bmi = 0;
    let weight = 0;
    let height = 0;
    const result = document.getElementById("result");

    data.weightOption === "lbs"
      ? (weight = data.weight * 0.453592)
      : (weight = data.weight);
    data.heightOption === "in"
      ? (height = (data.height * 2.54) / 100)
      : (height = data.height / 100);

    if (height <= 0) {
      result.innerHTML = "Please, enter valid numbers!";
      return;
    } else if (weight <= 0) {
      result.innerHTML = "Please, enter valid numbers!";
      return;
    }
    bmi = Math.round((weight / Math.pow(height, 2)) * 10) / 10;

    if (bmi <= 18.4) {
      result.innerHTML = `Your Body Mass Index is ${bmi}. This is considered as underweight`;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      result.innerHTML = `Your Body Mass Index is ${bmi}. This is considered as normal`;
    } else if (bmi >= 25 && bmi <= 30) {
      result.innerHTML = `Your Body Mass Index is ${bmi}. This is considered as overweight`;
    } else if (bmi >= 30.1) {
      result.innerHTML = `Your Body Mass Index is ${bmi}. This is considered as obese`;
    }
  });
};
