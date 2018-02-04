(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function (e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            if (typeof this.hash === 'Undefined') return;
            var target = $(this.hash);
            e.preventDefault();
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 0)//61
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 61
    });

    // Collapse the navbar when page is scrolled
    $(window).scroll(function () {
        var mainnav = $("#mainNav");
        if (mainnav.length === 0) return;
        if (mainnav.offset().top > 100) {
            mainnav.addClass("navbar-shrink");
        } else {
            mainnav.removeClass("navbar-shrink");
        }
    });

    //Signup Form

    $("#signupform").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            dataType: "jsonp",
            error: function (jqXHR, textStatus, errorThrown) {
                $("#signupform-msg").html("<div class=\"alert alert-danger\" role=\"alert\">An error has occurred!</div>");
            },
            success: function (result) {
                $("#signupform-msg").html("");
                $(".form-control, .custom-control-input").each(function () {
                    $(this).removeClass("is-invalid").addClass("is-valid").blur();
                    $(this).parent().find(".invalid-feedback").remove();
                });

                if (result.status === 'success') {
                    $(".form-control, .custom-control-input").each(function () {
                        $(this).removeClass("is-valid");
                    });

                    $("#signupcont").hide(500);
                    $("#signupsuccess").show(500);
                    $("#signupform")[0].reset();

                    setTimeout(function () {
                        $("#signupcont").show(500);
                    }, 15000);

                    setTimeout(function () {
                        $("#signupsuccess").hide(500);
                    }, 30000);
                } else {
                    $("#signupsuccess").hide(500);
                    $("#signupform-msg").html("<div class=\"alert alert-danger\" role=\"alert\">Please ensure your email/name are correct, and that you have agreed to receive communications!</div>");

                }
            }
        });
    });

    window.addEventListener("load", function () {
        var form = document.getElementById("signupform");
        form.addEventListener("submit", function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
             }

             form.classList.add("was-validated");
        }, false);
     }, false);
})(jQuery); // End of use strict