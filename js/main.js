const badgeEl = document.querySelector("header .badges");
const toTopEl = document.querySelector("#to-top");

window.addEventListener(
  "scroll",
  _.throttle(function () {
    console.log(window.scrollY);
    if (window.scrollY > 500) {
      /* 
      배지 숨기기
      badgeEl.style.display = 'none';
      gsap.to(요소, 지속시간seconds, 옵션);
    */
      gsap.to(badgeEl, 0.6, {
        opacity: 0, //서서히 배지가 숨겨짐
        display: "none",
      });
      /*  
      display를 설정하는 이유는
      opacity만 설정하면 배지의 div는 남아있어서 눈에는 안보이지만 배지 기능으로 줬던 
      링크 기능은 그대로 남아있어서 클릭은 할 수 있게 되어 none으로 설정해준다 
    */

      //arrow_upward 버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });
    } else {
      /*
      배지 보이기
      badgeEl.style.display = 'block';
      서서히 배지가 보여짐
    */
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
      //arrow_upward 버튼 숨기기
      gsap.to(toTopEl, 0.2, {
        x: 100,
      });
    }
  }, 300)
);
// _.throttle(함수, 시간milliscond)

toTopEl.addEventListener("click", function () {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

//메인 이미지들 순차적으로 나타나도록 함
const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7, // 요소들이 0.7 -> 1.4 -> 2.1 -> 2.7초에 동작
    opacity: 1,
  });
});

// 공지사항 SWIPER
//new Siper(선택자, 옵션)
new Swiper(".notice-line .swiper-container", {
  direction: "vertical",
  //autoplay: true,
  loop: true,
});

new Swiper(".promotion .swiper-container", {
  //direction: 'horizontal',  //default값이 horizontal이어서 설정 안해줘도 됨
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  //autoplay: {
  // delay: 500
  // }
  pagination: {
    el: ".promotion .swiper-pagination", //페이지 번호 요소 선택자
    clickable: true, //사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
});

new Swiper(".awards .swiper-container", {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
});

const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");
let isHidePromotion = false;
promotionToggleBtn.addEventListener("click", function () {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    //숨김 처리
    promotionEl.classList.add("hide");
  } else {
    //보임 처리
    promotionEl.classList.remove("hide");
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    {
      //옵션
      y: size,
      repeat: -1, //무한반복
      yoyo: true, //한번 재생된 애니메이션을 거꾸로 반복함
      ease: Power1.easeInOut,
      delay: random(0, delay),
    }
  );
}
floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8,
  })
    .setClassToggle(spyEl, "show")
    .addTo(new ScrollMagic.Controller());
});
