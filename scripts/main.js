"use strict";

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
	const buttonSubmit = document.getElementById("submitBtn");

  // add and remove placeholders
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

		//===========tracking changes in the form fields=========
form.addEventListener('change', (e) => {
	if (e.target.value == "") {
		addErrorMessage(e.target);
	}else {
		removeErrorMessage(e.target)
		if(e.target.id == 'email') {
			inputValidation(emailValidation, e.target, 'form-error--field', 'Input valid email')
		}
		if(e.target.id == 'phone') {
			inputValidation(phoneValidation, e.target, 'form-error--field', 'Input phone number like +353XX XXX XXXX')
		}
	}
	// ====check if form fields contain errors=======
	const requireFields = document.querySelectorAll(".required");
	let error = 0;
	let errorMessage = null
	for (let i = 0; i < requireFields.length; i++) {
		let input = requireFields[i];
		if(input.value =="") {
			error++
		}
		errorMessage = input.parentElement.querySelector(['.form-error', '.form-error--field'])
		if(errorMessage) error++
	}
	if(!error) {
		buttonSubmit.removeAttribute("disabled")
	}
})
// check input field values and show error messages
function inputValidation(validator, input, className, message) {
	const formError = input.parentElement.querySelector(`.${className}`)
	if(!validator(input) && !input.parentElement.contains(formError)) {
		removeErrorMessage(input)
		addErrorMessage(input, className, message)
	} else if(validator(input) || !input.value){
		removeErrorMessage(input)
	}
	return false
}
form.addEventListener("submit", (e) => {
	const body = Object.fromEntries(new FormData(e.target).entries());
	e.preventDefault();
	formSubmit(body);
	buttonSubmit.setAttribute("disabled", "true")
});

function addErrorMessage(input, className = 'form-error',  message = "Fill out required fields") {
	input.classList.add("error");
	input.parentElement.insertAdjacentHTML(
		"beforeend",
		`<p class=${className}>${message}</p>`
	);
}
function removeErrorMessage(input) {
	input.classList.remove("error");
	if (input.parentElement.querySelector("p")) {
		input.parentElement.removeChild(
			input.parentElement.querySelector("p")
		);
	}
}
function emailValidation(input) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
function phoneValidation(input) {
	return /^((0|\+)[\- ]?)?(\(?\d{3,5}\)?[\- ]?)?[\d\- ]{5,10}$/.test(input.value);
}
// ======Imitation of sending the form================
async function formSubmit(body) {
	const value = document.getElementById("name").value;
	let response = await fetch('/index.html', {
		method: 'POST',
		body: body
	});
	form.reset();
	form.insertAdjacentHTML(
		"beforeend",
		`<div class="form-submit">
			<p>Hi ${value} </p>
			<p>Your message is submited</p>
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
			clickable: true,
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
