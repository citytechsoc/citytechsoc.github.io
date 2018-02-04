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

    $("#signupform").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: "json",
            error: function (xhr, status, error) {
                //var err = JSON.parse(xhr.responseText);
                console.log(xhr.responseText + ' ' + status);
                $("#signupform-msg").html("<div class=\"alert alert-danger\" role=\"alert\">An error has occurred!</div>");
            },
            success: function (data) {
                $("#signupform-msg").html("");
                $(".form-control, .custom-control-input").each(function () {
                    $(this).removeClass("is-invalid").addClass("is-valid").blur();
                    $(this).parent().find(".invalid-feedback").remove();
                });

                console.log(data);

                if (data.result === 'success') {
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
                } else if (data.result === 'error') {
                    $("#signupsuccess").hide(500);
                    $("#signupform-msg").html("<div class=\"alert alert-danger\" role=\"alert\">"+data.msg+"</div>");
                } else {
                    $("#signupsuccess").hide(500);
                    $("#signupform-msg").html("<div class=\"alert alert-danger\" role=\"alert\">An unknown error occured.</div>");

                }
            }
        });
    });
})(jQuery); // End of use strict