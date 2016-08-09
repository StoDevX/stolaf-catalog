function getElementsByClassName(className, tag) {
	var ret = [];
	if (document.getElementsByClassName) {
		var els = document.getElementsByClassName(className);
		var nodere = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null;
		for(var i=0; i < els.length; i++) {
			if(nodere.test(els[i].nodeName)) {
				ret[ret.length] = els[i];
			}
		}
	} else {

		var els = document.getElementsByTagName(tag);
		for(var i=0; i < els.length; i++) {
			if(els[i].className == className)
				ret[ret.length] = els[i];
		}
	}
	return ret;
}
function showNav() {
	var els = getElementsByClassName("topnav", "a");
	for(var i=0; i < els.length; i++) {
		els[i].style.display = "block";
	}
}
function hideNav() {
	var els = getElementsByClassName("topnav", "a");
	for(var i=0; i < els.length; i++) {
		els[i].style.display = "none";
	}
}
function loaded() {
	if(window.location.hash.length > 0 && window.location.hash != "#top" && window.location.hash != "top")
		showNav();
	else
		hideNav();
}

$(document).ready(function(){

	//Accessibility helper
    $('.noscript').removeClass('noscript');

    //Show menu when focused
    $('.accessible li a').focus(function() {$('.accessible').addClass('noscript');});
    $('.accessible li a').blur(function() {$('.accessible').removeClass('noscript');});

    //To Top
    $('a#totop').hide();
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('a#totop').fadeIn();   
        } else {
            $('a#totop').fadeOut();
        }
    });

    //Main nav hamburger toggle
    $("#hamburger").click(function() {
    	$("#navigation ul").slideToggle("fast");
    });

    //Sidebar header navigation toggle
    $("#sidebar-nav-mobile").click(function() {
    	if($(window).width() < 767) {
    		$("#cl-menu").slideToggle("fast");
    	}
    }); 

    var querywidth = 767 - (window.innerWidth - $('body').width());
    function checkWidth(){
        if ($(window).width() <= querywidth) {
            $('#cl-menu').hide();
            $("#navigation ul").hide();
            bubblewidth = '100%';
        } else {
            $('#cl-menu').show();
            $("#navigation ul").show();
            bubblewidth = '450';
        }
    }

    //Execute on load
    checkWidth();

    //Bind
    var width = $(window).width();
    $(window).resize(function() {
        if($(window).width() != width) {
            checkWidth();
        }
    });


});

function togglePanel() {
    $("#page-wrap").toggleClass("panel-open");
    window.scrollTo(0, 0);
}