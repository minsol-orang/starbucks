const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () { // click이벤트 사용 (search라는 클래스를 가지고 있는 요소를 클릭하면 핸들러(익명함수) 실행
    searchInputEl.focus(); /* 인풋 요소를 포커스를 적용한다는 의미 */
    //인풋요소 자체를 선택 하지 않고 인풋 요소가 소속해있는 search라는 클래스를 가지고 있는 div를 선택하면 인춧요소가 포커스됨
});

searchInputEl.addEventListener('focus', function () {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholer', '통합검색'); // searchInputEl에다가 특정 HTML의 속성을 지정할 때 사용
    //첫 번째 인수는 속성의 이름을, 두 번째 인수로는 해당 속성의 값을 입력 placeholer 입력값에 대한 힌트
});

searchInputEl.addEventListener('blur', function () { // blur는 forcus가 해제됐음을 의미함
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholer', '');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top'); // id가 to-top인 요소를 찾아서 toTopEl 변수가 대입


/* window는 우리의 프로젝트가 나타나 있는 브라우저의 하나의 탭을 의미 (창) 즉, 우리의 프로젝트 화면을 의미*/
/* 300은 0.3초를 의미. 화면이 스크롤 될 때 실행되는 함수의 개수를 throttle이라는 메소드를 이용해서 
일정 시간에 한 번 씩만 실행되도록 제한을 건 것. 스크롤 작업이 많이 사용됨 */
/* _.throttle(함수, 시간) */
window.addEventListener('scroll', _.throttle(function () {
    if(window.scrollY > 500) {  
        /* scrollY라는 값을 통해서 지금 화면이 위에서부터 몇 픽셀 지점에 위치하고 있는지 파악 가능. 여기서는 스크롤 값이 500픽셀이 넘어가면 */
        // badgeEl.style.display = 'none';
        // 배지 숨기기 
        // gsap.to(요소, 지속시간, 옵션) 애니메이션이 적용될 요소, 애니메이션이 지속되는 시간과 어떻게 처리할지에 대한 옵션
        gsap.to(badgeEl, .6, {
            opacity : 0,
            display : 'none' // display 속성은 애니메이션을 지원하지 않기 때문에 opacity값이랑 같이 넣어준 것
        });
        // to-top 버튼 보이기
        gsap.to(toTopEl, .2, {
            x: 0  // 버튼이 보일때는 원래 위치
        });

    } else {
        // badgeEl.style.display = 'block';
        gsap.to(badgeEl, .6, {
            opacity : 1,
            display : 'block'
        });
        // to-top 버튼 숨기기
        // gsap은 요소를 직접적으로 찾아서 넣어주는 것도 좋지만 css선택자만 작성해주어도 gsap에 to라는 메소드가 해당하는 요소를 자동으로 찾아줌
        gsap.to(toTopEl, .2, {
            x: 100 // x축의 이동값을 추가하겠다는 의미. 버튼이 숨어질 수 있또록 오른쪽으로 100픽셀 지점으로 이동
        });

    }
}, 300)); 

toTopEl.addEventListener('click', function () {   // toTop 이라는 요소를 클릭하면 뒤쪽의 익명함수를 실행하겠다는 의미. 여기서의 익명의 함수는 이벤트의 핸들러 라고 함
    gsap.to(window, .7, { // gsap 이라는 라이브러리가 window 객체를 통해서 화면 자체를 애니메이션 처리를 하면서 특정한 위치로 옮겨줄 것임. 움직여지는 시간은 0.7초 
        scrollTo: 0 // 스크롤의 위치 즉 화면의 위치를 0픽셀 지점으로 옮겨주겠다는 의미

    }); 
});


const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach (function (fadeEl, index) {
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7, // 각 요소들이 사이에 0.7초 간격으로 실행 0.7, 1.4, 2.1, 2.7
        opacity : 1
    });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true // 반복재생이 가능하도록 하는 옵션
});
// new는 자바스크립트의 생성자 ( 클래스 )  첫 번째 인수는 css선택자 즉 슬라이드 할 요소


new Swiper('.promotion .swiper-container', {
    /* direction: 'horizontal' 이미 direction의 기본 값은 horizontal 이기 떄문에 명시하지 않아도 됨 */
    slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가장 왼쪽에 나오는 것이 아니고 가운데 보이게 하기
    loop: true,
    autoplay: {
        delay: 5000 // 5초에 한 번씩 슬라이드. 기본값은 3000
    },
    pagination: {
        el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        // promotion 이라는 클래스를 가지고 있는 요소의 후손인 swiper-pagination 이라는 요소를 
        // 실제로 페이지 번호를 사용하는 요소로 사용하겠다는 의미로 
        // 맞는 요소를 찾아서 페이지 번호를 사용할 수 있도록 동작이 됨
        clickable: true // 사용자의 페이지 번호 요소 제어
        // 클릭이 가능한지 즉 사용자가 이 페이지 번호 요소를 단순히 시각적으로 보는 것만이 아니고
        // 실제로 눌러서 제어할 수 있는지에 대한 여부를 이 클릭 커블이라는 옵견을 통하여 제어 가능
    },
    navigation: {
        prevEl: '.promotion .swiper-prev', // previous 라는 단어의 약어. 즉 이전 슬라이드 보는 버튼
        nextEl: '.promotion .swiper-next' // 다음 슬라이드 보는 버튼의 선택자를 명시
        // CSS로 따로 위치를 잡아서 정리를 해줘야 화면에 출력됨. 
    }
});

// 첫 번째 인수는 선택자를 입력, 두 번째 인수는 슬라이드 기능에서 필요한 옵션
new Swiper('.awards .swiper-container', {
    autoplay : true, // 자동재생
    loop : true, // 반복재생
    spaceBetween : 30, // 사이 여백 30px
    slidesPerView : 5, // 하나의 화면에 몇 개의 슬라이드들을 보이게 할 것인가
    navigation : {
        prevEl: '.awards .swiper-prev', 
        nextEl: '.awards .swiper-next'
    }
});



const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // 프로모션 영역이 숨겨져 있는지 상태를 나타내는 변수. 바뀌어야 하기에 let 변수 사용 

promotionToggleBtn.addEventListener('click', function () { // 이벤트 핸들러 (함수)
    isHidePromotion = !isHidePromotion
    // 느낌표가 붙어있는 뒤쪽에 있는 값이 반대가 되게 만들어 주세요. 라는 의미
    // true -> false , flase -> true
    if (isHidePromotion) {
        // 프로모션 부분을 숨김처리 해주기
        promotionEl.classList.add('hide');
    } else {
        // 프로모션 부분을  다시 보임 처리
        promotionEl.classList.remove('hide');
    }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) { // 첫 번째 인수는 랜덤한 값이 나올 최소 숫자, 두 번쨰 인수는 랜덤한 값이 나올 최대 숫자
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

function floatingObject (selector, delay, size) { // 함수가 호출될 때 인수로 어떤 요소를 선택할 것인지 선택자라는 개념을 받을 것이고 그것을 selector라는 매개변수로 받아서 사용할 것임
    // gsap.to(요소, 지속시간, 옵션); * 요소를 받는 부분에 우리가 검색한 요소 대신 css선택자만 넣어도 gsap이 내부적으로 요소를 찾아서 넣어줬으면 그 찾아진 요소를 활용하고 내부적이로 이 선택자를 활용해서 직접적으로 요소를 찾아줄 수 있음
    gsap.to(
        selector, 
        random(1.5,2.5), 
        { // 객체 데이터
            y: size, // y는 y축을 의미라고, y축으로 얼마만큼 움직이면서 애니메이션 처리를 할 것이냐 를 지정하게 됨 
            repeat:-1,  // repeat이라는 속성을 통하여 몇 번 반복해줄 것인지 설정할 수 있음. -1 값은 무한반복 하겠다는 의미 
            yoyo: true, // yoyo라는 속성은 한 번 재생된 애니메이션을 다시 뒤로 재생을 해서 위에서 및으로 내려왔다가 다시 위로 올라갈 수 있는 그러한 구조를 만들어 주는 것
            ease: Power1.easeInOut, // Type : easeInOut 천천히 끝나는 부분에서 다시 끊기는 부분이 없는 상태로 애니메이션을 반복적으로 실행할 수 있음
            delay: random(0, delay) // delay는 몇 초 뒤에 애니메이션을 실행하겠다 라는 지연 시간을 추가해 주는 옵션. 값은 내부에서 랜덤하게 딜레이를 실행할 수 있도록 정의
        }
    );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);



// 우리가 감시하려고 하는 그 각각의 섹션 부분에 scroll-spy 라는 클래스들을 하나씩 붙여줄 것이고, 
// 그렇게 클래스가 붙어 있는 각각의 섹션들은 spy elements 라는 이 변수에 모두 다 할당이 될 것이고, 
// 그 섹션들을 반복적으로 처리를 하는데 그렇게 반복될 때마다 spy element라는 매개변수에 그 값이 들어있을 것이고,
// 그 spy element는 곧 내가 감시하고 있는 하나의 섹션이 되는 것임
const spyEls = document.querySelectorAll('section.scroll-spy'); // section 이라는 태그들이 있는데 만약 거기에 scroll-spy 라는 클래스가 붙어 있다면 그 요소들을 전부 찾겠다는 의미
spyEls.forEach(function(spyEl) {
    new ScrollMagic
         // Scene이라는 것은 scroll-magic 이라는 자바스크립트 라이브러리를 통해서 특정한 요소를 감시하는 옵션을 지정해주는 메소드
        // 요소가 화면에 보이는지 안 보이는지 감시할 때 필요한 여러 가지 옵션들을 scene 이라는 메소드가 추가해주면 됨
        .Scene({
            // 이 scroll magic 이라는 자바스크립트 라이브러리를 통해서 감시하는 요소가 이 부분의 옵션에 지정이 되는 개념
            // 여기서 얘기하는 trigger 라는 것은 무엇인가를 강제적으로 일으킬 때 사용하는 단어

            triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
            // scroll magic자바스크립트 라이브러리는 뷰포트의 시작부분을 0, 끝나는 부분을 1로 판단하는데 
            // trigger 라는 개념이 0.8에 hook(걸려있음)되어 있기 때문에 내가 감시하려는 요소가 스크롤로 쭉 올라오다가 0.8이라는 뷰포트 지점에 걸리면, 그떄 어떠한 내용이 trigger된다. 즉, 실행된다
            // triggerhook 이라는 것은 내가 감시하고 있는 요소가 뷰포트의 "어떤 지점"에서 감시되었다는 것을 판단할 것인가 라는 것을 지정해주는 옵션
            // 그렇게 감시하는 옵션을 통해서 해당하는 요소가 화면에 보여진다 라고 판단되면 및에 set class toggle이라는 메소드를 실행함
            triggerHook: .8 
        })
        // setClassToggle 는 어떤 클래스를 넣었다가 뺐다가 이런 식으로 제어해주는 역할
        .setClassToggle(spyEl, 'show') // 인수를 두 개를 적어줄 수 있음. 첫 번째는 어떠한 클래스를 토글할 그 요소를 지정해줄 수 있음. 두 번쨰는 토글할 그 클래스의 이름을 지정해줄 수 있음
        // addTO는 이 scrollmagic 이라는 자바스크립트 라이브러리가 필요한 컨트롤러라는 개념의 내용을 추가하기 위해 사용해야 함
        .addTo(new ScrollMagic.Controller());  //scrollMagic에서 기본적으로 우리가 추가한 옵션들을 내부의 컨트롤러의 내용을 할당해서 실제로 동작할 수 있는 구조를 만들어주는 용도로 사용이 됨
             
});


const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();  // textContent 는 말 그대로 글자 내용들의 값을 알아내거나 거기에 값을 지정하는 용도로 쓸 수 있음 
// 자바스크립ㅂ트에는 현재 날씨 정보를 가지고 있는 date 라는 객체를 갖고 있음 . getFullYear 메소드를 실행해주면 메소드에서 현재 년도의 정보가 숫자 데이터로 반환이 됨 */


