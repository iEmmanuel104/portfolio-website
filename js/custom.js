/*global $, window, WOW*/

$(function () {
    
    "use strict";
    
    var win = $(window),
        htmlBody = $("html, body"),
        scrollToTop = $(".scroll-top"),
        progressCheck = false,
        factsCheck = false;
        
    
    /*========== Loading  ==========*/
    $('.preloader').delay(200).fadeOut(700, function () {
        $(this).remove();
    });
    
    /*========== Mobile Menu  ==========*/
    $(".control-bar .menu-toggle").on("click", function () {
        $(this).toggleClass("active");
        $(".slide-menu").toggleClass("active");
    });
    
    /*========== Smooth Scroll  ==========*/
    $(".slide-menu .menu-list li a").on("click", function (e) {
        e.preventDefault();
        htmlBody.animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 600);
    });
    
    /*========== Add Class Active to Menu Links on Scrolling  ==========*/
    $("section").each(function () {
        if (win.scrollTop() >= $(this).offset().top - 1) {
            $(".slide-menu .menu-list li a[href='#" + $(this).attr("id") + "']").addClass("active").parent().siblings().find("a").removeClass("active");
        }
    });
    win.on("scroll", function () {
        $("section").each(function () {
            if (win.scrollTop() >= $(this).offset().top - 1) {
                $(".slide-menu .menu-list li a[href='#" + $(this).attr("id") + "']").addClass("active").parent().siblings().find("a").removeClass("active");
            }
        });
    });
    
    /*========== Skills Progress  ==========*/
    function skillsPogress() {
        $('.chart').easyPieChart({
            size: 140,
            barColor: '#dca52e',
            trackColor: '#313131',
            scaleColor: false,
            lineWidth: 2,
            scaleLength: 4,
            lineCap: 'circle',
            animate: {
                duration: 2000,
                enabled: true
            }
        });
    }
    
    if (!progressCheck && $(this).scrollTop() >= $(".skills").offset().top - 300) {
        skillsPogress();
        progressCheck = true;
    }
    
    win.on("scroll", function () {
        
        if (!progressCheck && $(this).scrollTop() >= $(".skills").offset().top - 300) {
            skillsPogress();
            progressCheck = true;
        }
        
    });
    
    /*========== Start Portfolio Trigger Filterizr Js  ==========*/
    $("#control li").on('click', function () {
        $(this).addClass('active').siblings("li").removeClass('active');
    });
    // The Filterizr
    $('#filtr-container').filterizr({
        animationDuration: 0.4
    });
    
    /*========== Start Magnigic Popup Js ==========*/
    if ($('.portfolio-content .item')[0]) {

        $('.portfolio-content .item').magnificPopup({
            delegate: '.icon-img',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
    
    /*========== Facts Counter  ==========*/
    // if (!factsCheck && $(this).scrollTop() >= $(".facts").offset().top - 400) {
    //     $(".facts .fact-number").countTo();
    //     factsCheck = true;
    // }
    
    // win.on("scroll", function () {
    //     if (!factsCheck && $(this).scrollTop() >= $(".facts").offset().top - 400) {
    //         $(".facts .fact-number").countTo();
    //         factsCheck = true;
    //     }
    // });
    
    /*========== Owl Carousel Js Testimonial  ==========*/
    $(".testimonials .owl-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 500,
        margin: 10,
        loop: true,
        autoplayHoverPause: true,
		responsiveClass: true
    });
	
	/*========== Ajax Contact Form  ==========*/
	// $('.contact-form').on("submit", function () {
	// 	var myForm = $(this),
	// 		data = {};
	// 	myForm.attr('action', 'http://localhost:3000/api/v1/mail');
    //     myForm.attr('method', 'POST');
	// 	myForm.find('[name]').each(function() {
			
	// 		var that = $(this),
	// 			name = that.attr('name'),
	// 			value = that.val();
			
	// 		data[name] = value;
			
	// 	});

    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify(data);

    //     var requestOptions = {
    //     method: myForm.attr('method'),
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    //     };

    //     fetch(myForm.attr('action'), requestOptions)
    //     .then((response) => {
    //         // response.text()
    //         if (response.ok) {
    //             setTimeout(function () {
    //                 $(".contact-form").find(".form-message").addClass("success")
    //                 $(".form-message span").text("Message Sent!");
    //                 $(".contact-form").find(".form-message").fadeIn(5000);
    //             }, 8000); 
    //             // myForm.reset();
    //         }        
    //     })
    //     // .then(result => console.log(result))
    //     .catch((error) => {
    //         console.log('error', error)
    //         setTimeout(
    //             function()  
    //             {
    //                 $(".contact-form").find(".form-message").addClass("error")
    //                 $(".form-message span").text("ERROR: Message Not Sent!");
    //                 $(".contact-form").find(".form-message").fadeIn(5000);
    //             }, 8000)
    //     }); 
    // }); 
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = {
            name: $("#name").val(),
            email: $("#email").val(),
            subject: $("#subject").val(),
            message: $("#message").val(),
        };  
        // Set the request headers
        const headers = {
            'Content-Type': 'application/json'
        };  
        let base_URL = "";
        // Make the Axios request
        axios.post(base_URL + "/signup", requestBody, { headers })
            .then((response) => {
                Toastifymessage('success', 'Welcome to Taximania, please check your Email for your verification');
                console.log(response.data);

                // set email value in user object in reponse.data to local storage
                localStorage.setItem('email', response.data.user.email);
                // redirect to verify page after 8 seconds
                setTimeout(() => {
                    window.location.href = "/verify";
                }, 7000);
                // clear the form
                form.reset();
            })
            .catch((error) => {
                // return error message
                axiosErrorHandling(error);
                console.error(error);

            });
    })


    /*========== Scroll To Top  ==========*/
    function scrollUp() {
        if (win.scrollTop() >= 1200) {
            scrollToTop.addClass("active");
        } else {
            scrollToTop.removeClass("active");
        }
    }
    
    scrollUp();
    
    win.on("scroll", function () {
        scrollUp();
    });
    
    scrollToTop.on("click", function (e) {
        e.preventDefault();
        htmlBody.animate({
            scrollTop: 0
        }, 800);
    });
    
});

