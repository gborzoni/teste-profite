// "use strict";

var fns = {
    isMobile: function () {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.search(/(android|avantgo|blackberry|iemobile|nokia|lumia|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) != -1) {
            return true;
        };
    },

    verifyWidth: function () {
        if ($(window).width() <= 1024) {
            $('body').addClass('isMobile');
            $('body').removeClass('notMobile');
            return true
        } else {
            $('body').removeClass('isMobile');
            $('body').addClass('notMobile');
            return false
        }
    },

    loadJSON: function(url, callback) {
        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
              }
        };
        xobj.send(null);  
    },
}

var global = {
    init: function() {
        global.menuToggle();
    },

    menuToggle: function () {
        // Open Menu
        $('.action-menu a').on('click', function (e) {
            if (fns.verifyWidth()) {
                e.preventDefault();
                $('.pageNav').addClass('open');
                $('body').addClass('menuOpen');
                if ($('.navOverlay').css("display") == "none") {
                    $('.navOverlay').fadeIn(300);
                }
            }
        })

        //Close Menu
        $('.navHead .ico-close, .navOverlay').on('click', function (e) {
            if (fns.verifyWidth()) {
                e.preventDefault();
                $('.pageNav').removeClass('open');
                $('body').removeClass('menuOpen');
                if ($('.navOverlay').css("display") == "block") {
                    $('.navOverlay').fadeOut(300);
                }
            }
        });
    },
}

var home = {
    init: function() {
        home.getProduct();
    },

    getProduct: function() {
        fns.loadJSON("product.json",function(data){
            var json = JSON.parse(data);
            console.log(data);
        })
    }
}

$(document).ready(function() {
    global.init();

    if($('body').hasClass("home")) {
        home.init();
    }
})