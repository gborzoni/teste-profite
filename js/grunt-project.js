/**
Profit-e teste de layout - 0.1.0
https://github.com/gborzoni/teste-profite
Copyright (c) 2019 Guilherme Borzoni
License: 
*/

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

var slider = {
    commonSlider: function (element) {
        element.slick({
            dots: true,
            arrows: false,
            pauseOnHover: false,
            autoplay: false,
            autoplaySpeed: 6000,
            mobileFirst:true,			
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<i class="ico-arrow slick-prev"></i>',
            nextArrow: '<i class="ico-arrow slick-next"></i>',
            responsive: [
                {
                    breakpoint: 768,
					settings: {
						arrows: true,
					}
                }
            ]
            
        });
    },

    shelfSlider: function () {
        $('.has-carroussel ul').slick({
            dots: true,
            arrows: false,
            pauseOnHover: false,
            autoplay: false,
            autoplaySpeed: 6000,
            mobileFirst:true,			
			infinite: false,
			slidesToShow: 2,
			slidesToScroll: 2,
			prevArrow: '<i class="ico-arrow slick-prev"></i>',
            nextArrow: '<i class="ico-arrow slick-next"></i>',
            responsive: [
                {
                    breakpoint: 768 - 1,
					settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
					}
                },{
                    breakpoint: 968,
                    settings: {
                        arrows: true,
                        dots: false,
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }
            ]
        });
    },


}

var home = {
    init: function() {
        home.getBanners();
        home.getProduct();
    },

    getBanners: function() {
        fns.loadJSON("https://raw.githubusercontent.com/gborzoni/teste-profite/master/ajax/banner.json",function(data){
            var response = JSON.parse(data);
            
            $.each(response, function(index, value){
                var bannerHtml = '<div class="box-banner" style="background-image: url(img/'+response[index].banner+')">';
                        bannerHtml += '<div class="banner-wrap">';
                            bannerHtml += '<h2>' + response[index].texto + '</h2>';
                        bannerHtml += '</div>'
                    bannerHtml += '</div>'

                $('#home-full-gallery ').append(bannerHtml);
            })

            slider.commonSlider($("#home-full-gallery"))
        })
    },

    getProduct: function() {
        fns.loadJSON("https://raw.githubusercontent.com/gborzoni/teste-profite/master/ajax/product.json",function(data){
            var response = JSON.parse(data);
            
            var shelfHtml = '<ul class="profite-shelf">';
            $.each(response, function(index, value){
                    shelfHtml += '<li class="shelf-product" data-id="'+response[index].id+'">'
                        shelfHtml += '<div class="flag-group">';
                            if(response[index].off) {
                                shelfHtml += '<div class="flag off"> <span>OFF</span> </div>';
                            }
                        shelfHtml += '</div>';
                        shelfHtml += '<div class="product-image">';
                            shelfHtml += '<a href="#">';
                                shelfHtml += '<img src="'+response[index].img+'" alt="">';
                            shelfHtml += '</a>';
                        shelfHtml += '</div>';
                        shelfHtml += '<div class="product-info">';
                            shelfHtml += '<div class="product-name">'+response[index].titulo+'</div>';
                            shelfHtml += '<div class="product-review avaliacao'+response[index].avaliacao+'"></div>';
                            shelfHtml += '<div class="product-price">';
                                shelfHtml += '<div class="list-price">'+response[index].precoDe+'</div>';
                                shelfHtml += '<div class="best-price">'+response[index].precoPor+'</div>';
                                shelfHtml += '<div class="installment">'+response[index].precoOu+'</div>';
                            shelfHtml += '</div>';
                            shelfHtml += '<div class="shelf-buy">';
                                shelfHtml += '<a class="btn-shelf"><i class="ico-cart-add"></i> Comprar</a>'
                            shelfHtml += '</div>';
                        shelfHtml += '</div>';
                    shelfHtml += '</li>';
            })
            shelfHtml += '</ul>';

            $('.has-carroussel').append(shelfHtml);

            slider.shelfSlider();
        })
    }
}

$(document).ready(function() {
    global.init();

    if($('body').hasClass("home")) {
        home.init();
    }
})