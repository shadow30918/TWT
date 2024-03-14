let mdqMD = window.matchMedia('(max-width: 1200px)');
let mdqMB = window.matchMedia('(max-width: 1080px)');
new img_onload('.kv-frame', function(){
    $("body").addClass("header-loading-done");
    setTimeout(function() {
        $("body").addClass("remove-loading")
    }, 2e3);
    setTimeout(function() {
        if(mdqMB.matches) {
            AOS.init();
        } else {
            AOS.init({
                once: true
            });
        }

        let hashList = ['#sec-1', '#sec-2', '#sec-3', '#sec-4', '#sec-QA'];
        if(window.location.hash) {
            hashList.forEach(function(e, index) {
                if(window.location.hash === e) {
                    if(e === '#sec-QA') {
                        $('html').animate({scrollTop: $('#QA').offset().top})
                    } else {
                        if(mainSwiper.enabled) {
                            mainSwiper.slideTo(index + 1);
                        } else {
                            $('html').animate({scrollTop: $('section').eq(index + 1).offset().top - 110})
                        }
                    }
                }
            })
        }
    }, 600)
})
let tabSwiper = new Swiper(".main-nav .swiper-container", {
    slidesPerView: "auto",
    spaceBetween: 8,
    autoplay: false,
    simulateTouch: true,
    grabCursor: true,
    allowTouchMove: true,
    loop: false,
    speed: 500,
    navigation: {
        nextEl: ".main-nav .swiper-navigation .-next",
        prevEl: ".main-nav .swiper-navigation .-prev",
        disabledClass: "-disabled"
    }
})

let swiperSec1 = new Swiper('.sec-1-frame .swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-navigation .-next",
        prevEl: ".swiper-navigation .-prev",
        disabledClass: "-disabled"
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
})

let swiperSec2 = new Swiper('.sec-2-frame .swiper', {
    slidesPerView: "auto",
    spaceBetween: 0,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-navigation .-next",
        prevEl: ".swiper-navigation .-prev",
        disabledClass: "-disabled"
    },
})

let swiperSec4 = new Swiper('.sec-4-frame .swiper', {
    slidesPerView: "auto",
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    spaceBetween: 0,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-navigation .-next",
        prevEl: ".swiper-navigation .-prev",
        disabledClass: "-disabled"
    },
})

if(isMobileDevice()) {
    $('body').addClass('-mobile')
}


navSwiperObj = {
    slidesPerView: "auto",
    spaceBetween: 0,
    autoplay: false,
    simulateTouch: true,
    grabCursor: true,
    allowTouchMove: true,
    loop: false,
    speed: 500,
    navigation: {
        nextEl: ".swiper-navigation.-next",
        prevEl: ".swiper-navigation.-prev",
        disabledClass: "-disabled"
    },
}
let navSwiper = new Swiper('.float-tool .swiper', navSwiperObj);

//mainswiper以下滾動
let mainSwiperObj = {
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: true,
    autoHeight: true,
    speed: 500,
    noSwiping: true,
    noSwipingClass: 'swiper-slide',
    on: {
        slideChangeTransitionStart() {
            $('.aos-init').removeClass('aos-animate');
        },
        slideChangeTransitionEnd() {
            this_index = this.activeIndex;
            if(this_index === 4) {
                this.disable();
            }
            $(`.sec-${this_index}-frame`).find('.aos-init').addClass('aos-animate');
            $('.main-nav-tabs-swiper').find('.main-nav-tab').removeClass('-active');
            if(this_index !== 0) {
                $('.main-nav-tabs-swiper').find('.main-nav-tab').eq(this_index - 1).addClass('-active');
            }
            
        },
        slideChange() {
            let _index = this.activeIndex;
            //$('.main-nav-tabs-swiper').find('.main-nav-tab').removeClass('-active');
            if(_index !== 0) {
                $('.top-nav').removeClass('-active');
                $('.main-nav').find('.gradient-line').show();
                //$('.main-nav-tabs-swiper').find('.main-nav-tab').eq(_index - 1).addClass('-active');
                $('.top-btn, .chat-btn').addClass('-active');
            } else {
                $('.main-nav-tabs-swiper').find('.main-nav-tab').removeClass('-active');
                $('.top-btn, .chat-btn').removeClass('-active');
                if($(window).width() > 1200) {
                    $('.top-nav').addClass('-active');
                    $('.main-nav').find('.gradient-line').hide();
                }
            }
            $('.float-tool').removeClass('-active');
        }
    }
}

mainSwiper = new Swiper(".main-swiper-container", mainSwiperObj);
document.querySelector('.main-swiper-container').addEventListener('wheel', (event) => {
    if(!mainSwiper.destroyed) {
        if(event.deltaY < 0 && !mainSwiper.enabled && $(window).scrollTop() === 0) {
            mainSwiper.enable();
            $(`.sec-4-frame`).find('.aos-init').addClass('aos-animate');
        }
    }
});


//scroll
let st = 0;
let sectionID = ['.kv-frame', '.sec-1-frame', '.sec-2-frame', '.sec-3-frame', '.sec-4-frame', '.final-sec'];
$(window).on('scroll', function(){
    var win_st = $(window).scrollTop();

    if($(window).scrollTop() <= 0 && !mainSwiper.enabled){
        if(!mainSwiper.destroyed) {
            
            $('.main-nav-tabs-swiper').find('.main-nav-tab').removeClass('-active').eq(-2).addClass('-active');
        }
    }else {
        $('.main-nav-tabs-swiper').find('.main-nav-tab').removeClass('-active').eq(-1).addClass('-active');
    }

    //手機版小工具、scrollspy
    if(mdqMB.matches) { 
        if(st < $(window).scrollTop()) {
            $('.float-tool').removeClass('-active');
        } else {
            $('.float-tool').addClass('-active');
        }
        st = $(window).scrollTop();

        sectionID.forEach(function(e, index) {

            let secOffset = $(e).offset().top;
            let secH = $(e).outerHeight();
            let secBtm = secOffset + secH;

            if(st+120 < secBtm && st+120 >= secOffset) {
                $('.main-nav-tab').eq(index-1).addClass('-active');
                tabSwiper.slideTo(index-1);
            } else{
                $('.main-nav-tab').eq(index-1).removeClass('-active');
            }
        })
        
        if(st > $('.kv-frame').outerHeight()) {
            $('.top-btn, .chat-btn').addClass('-active');
        } else {
            $('.top-btn, .chat-btn').removeClass('-active');
        }
    }
})

//resize
$(window).on('resize', function(){
    if(!mdqMB.matches && !isMobileDevice()) {
        navSwiper.destroy(true, true);
        if(!mainSwiper.enabled) {
            mainSwiper = new Swiper(".main-swiper-container", mainSwiperObj);
        }
        switch_link("dt");
    } else if(mdqMB.matches){
        mainSwiper.destroy(true, true);
        navSwiper = new Swiper('.float-tool .swiper', navSwiperObj)
        switch_link("mb");
    }
}).trigger('resize')



$('.main-nav-tab').on('click', function(){
    let _index = $(this).index();

    console.log("click index："+_index)
    
    if(!mdqMB.matches) {
        if(_index !== 4) {
            
            $('html').animate({scrollTop: 0})
            mainSwiper.enable();
            mainSwiper.slideTo(_index + 1);
            setTimeout(function(){
                $('.main-nav-tab').removeClass("-active").eq(_index).addClass('-active');
            },500)

        } else {
            mainSwiper.slideTo(4);
            setTimeout(function(){
                $('html').animate({
                    scrollTop: $('#QA').offset().top
                });
            }, 200)
        }
    } else {
        if(_index !== 4) {
            $('html').animate({scrollTop: $('section').eq(_index+1).offset().top - 110})
        } else {
            $('html').animate({scrollTop: $('#QA').offset().top - 110})
        }
    }
})


//主動態
hoverAnimate('.main-swiper-container');
animationSet();
function fakeAOS () {

}
//QA
$('.qa-item-switch').on('click', function(){
    $(this).next().slideToggle();
    $(this).toggleClass('-active');
})

$('#qa-select').on('change', function() {
    let index = parseInt($(this).val());
    $('.qa-wrap').removeClass('-active').eq(index).addClass('-active');
})

//float-tool
$('.float-tool').find('.tab').on('click', function(){
    $('.float-tool').toggleClass('-active');
})

//popup
$('.popup-frame').find('.close').on('click', function(){
    $('.popup-frame, .popup-frame > div').fadeOut('fast');
    player.stopVideo();
})

$('.play-btn').on('click', function(){
    $('.popup-frame, .popup-3').fadeIn('fast');
})

// $('.sec-2-frame .more').on('click', function(){
//     $('.popup-frame, .popup-1').fadeIn('fast');
// })

// $('.sec-4-frame .item > a, .sec-5-frame .item > a').on('click', function() {
//     $('.popup-frame, .popup-2').fadeIn('fast');
// })

//fake
$('.member-status, .js-login').on('click', function(){
    //$(this).toggleClass('-active');
    $('.popup-frame, .popup-2').fadeIn('fast');
})

//top-btn
$('.top-btn').on('click', function() {
    if(!mdqMB.matches) {
        mainSwiper.enable();
        mainSwiper.slideTo(0);
        $('html').animate({scrollTop: 0})
    } else {
        $('html').animate({scrollTop: 0})
    }
})


function switch_link (type) {
    $(".switch_link").each(function(index,e){

        origin_link = $(this).attr("href");
        this_link = (type=="dt")? $(this).data("link-dt") :  $(this).data("link-mb");
        // this_link_dt = $(this).data("link-dt");
        // this_link_mb = $(this).data("link-mb");

        change_link = (this_link!='')?this_link : origin_link;

        $(this).attr("href",change_link);
    })
}

function to_close_popupframe () {
    $('.popup-frame, .popup-frame > div').fadeOut('fast');
    player.stopVideo();
}

function fake_login (){
    $('.member-status').addClass('-active');
    $('.sec-2-frame .ctn-container').removeClass("-active");
    $('.sec-2-frame .ctn-container.-login-month').addClass("-active");
    to_close_popupframe ()
}

function to_prepay_service() {
    $('.sec-2-frame .ctn-container').removeClass("-active");
    $('.sec-2-frame .ctn-container.-login-prepay').addClass("-active");
}