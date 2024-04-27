'use strict'

window.onload = () => {
	// ===================init menu burger================
	(function menuInit() {
		if (document.querySelector(".icon-menu")) {
			document.addEventListener("click", function (e) {
				if (e.target.closest('.icon-menu')) {
					document.documentElement.classList.toggle("menu-open");
					document.body.classList.toggle('lock');
				} else {
					document.documentElement.classList.remove("menu-open");
					document.body.classList.remove('lock')
				}
			});
		};
	})()
	//============= validation form ========================
	// const btnSubmit = document.querySelector('.contacts__btn');
	// const form = document.getElementById('form');
	// const name = document.getElementById('name');
	// const phone = document.getElementById('phone');
	// const email = document.getElementById('email');

	// form.addEventListener('submit', (e) => {
	// 	e.preventDefault();
	// 	const requireFields = document.querySelectorAll('.required');

	// 	let error = 0;
	// 	for(let i=0; i<requireFields.length; i++) {
	// 		let input = requireFields[i];
	// 		removeErrorMassege(input);
			
	// 		if(input.id == 'email') {
	// 			if(emailValidation(input)) {
	// 				addErrorMassege(input);
	// 				error++;
	// 			}
	// 		} else {
	// 			if(input.value == '') {
	// 				addErrorMassege(input);
	// 				error++;
	// 			}
	// 		}
	// 	}
	// 	if(error) alert('Fill required fields')

	// })
	// function addErrorMassege(input) {
	// 	input.classList.add('error');
	// }
	// function removeErrorMassege(input) {
	// 	input.classList.remove('error');
	// }
	// function emailValidation(input) {
	// 	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	// }

	// ======================init swiper=================
	const swiperThumb = new Swiper('.classes__slider-thumbs', {
		// Optional parameters
		direction: "vertical",
		slidesPerView: 7,
		spaceBetween: 10,

		watchSlidesProgress: true,
	});
	const swiperMain = new Swiper('.classes__slider', {
		// Optional parameters
		centeredSlides: true,
		effect: 'coverflow',
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
			}
		},
		pagination: {
			el: '.classes__pagination',
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: swiperThumb,
		},
	});
	// ==================================================
};
