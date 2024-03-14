function isMobileDevice() {
    const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
    let isMobileDevice = mobileDevice.some(e => navigator.userAgent.match(e))
    return isMobileDevice
}

function random(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var img_onload = function (target, callback) {
    let _this = this;
    let targetImg = $(target)[0].querySelectorAll("img");
  
    this.isInit = false;
    this.imgLoad = {
      count: 0,
      length: targetImg.length
    };
    this.callback = function () {
      if (this.imgLoad.count === this.imgLoad.length) {
        if (this.isInit) {
          return false;
        }
        this.isInit = true;
        callback();
      }
    };
  
    Array.prototype.slice.call(targetImg).forEach(function (img) {
      if (img.complete) {
        _this.imgLoad.count += 1;
        _this.callback();
      }
      else {
        img.addEventListener("load", function () {
          _this.imgLoad.count += 1;
          _this.callback();
        })
      }
    });
}

function animationSet() {
    $('.custom-ani').each(function(){
        let name = $(this).attr('data-cus-ani-name');
        let duration = $(this).attr('data-cus-ani-dur') || '3s';
        let direction = $(this).attr('data-cus-ani-dir') || 'alternate';
        $(this).css({
            'animation-name': name,
            'animation-duration': duration,
            'animation-direction': direction,
        })
    })
}

function hoverAnimate(target) {
    $(target).on('mousemove', function(event) {
        $('[move]').each(function(){
            let range = $(this).attr('data-move-range') || 0.02;
            let reverse = $(this).attr('data-move-dir') || 'normal'
            if (reverse === 'reverse') {
                range = range * -1;
            }
            $(this).css({
                'transform': `translate3d(${(event.screenX) * range}%, ${(event.screenY) * range}%, 0)`
            })
        })
    })
}