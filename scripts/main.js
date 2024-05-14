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
    console.log(value);
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
  // ==================================================
};
function flipCard() {
  const card = document.querySelector(".card");
  card.classList.toggle("is-flipped");
}
