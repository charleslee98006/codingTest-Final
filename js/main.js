var content;
var tosButton=false;
$( document ).ready(function() {
	buildPage();

	$('#skipPlayer').hide();
	$('#sample-textbox').hide();
	$('#tos-button').hide();
	$('#skipPlayer').delay(5000).fadeIn(1000);
	skipClick();
	repeat();
	tosClicked();
});

function buildPage(){
	$.getJSON("https://raw.githubusercontent.com/charleslee98006/CodingTestJSON/master/content.json", function(json) {
		content = json;
		console.log(content);
		console.log(content[0]);
		$("html").css({"background": "url(" + content[0].preload.backgroundImg+ ") no-repeat center center fixed"});
		$("#sample-textbox h1").text(content[0].intro.h1);
		$("#sample-textbox p").text(content[0].intro.p);
		$("#tos-button").text(content[0].ToS.button);
		buildBgMusic();
		buildPlayer();
	});

};	
function buildPlayer(){
      $("#jquery_jplayer_1").jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", {
            m4v: content[0].preload.video,
            // poster: "images/sample.png"
          }).jPlayer("play");
        },
        swfPath: "/js",
        supplied: "m4v",
        size: {
          width: "100%",
          height: "100%"
        },
        // autohide:{
        // 	restored: true, fadeIn:500,
        // },
        ended: function() {
			transitVid();
        }
      });
}
function skipClick(){
	$('#skipPlayer').click(function(){
		transitVid();
	});
}
function transitVid(){
	$( ".jp-video" ).fadeOut( "slow", function(){
	if (navigator.appVersion.indexOf("MSIE 10") !== -1){
    	$( "#container" ).css({"width":"800px", "height":"575px","background":"none", "margin":"100px 50px"});
    	$("#sample-textbox").css({"top":"100px", "left":"875px"});
    	$("#tos-button").css({"top":"550px", "left":"1160px"});
	}
	else{
		$( "#container" ).css({"width":"800px", "height":"575px","background":"none", "margin":"100px 50px"});
	}
	});
	$('#skipPlayer').fadeOut(500);
	$('#skipPlayer').hide();
    $( ".jp-video" ).fadeIn( 1000);
    $('#sample-textbox').fadeIn(1500);
    $('#tos-button').fadeIn(1500);
    $(".jp-progress").hide();
    $('audio').trigger("play");
}
function repeat(){
	$('.jp-play').click(function(){
		$('audio').trigger("pause");
		$( "#container" ).css({"width":"100%", "height":"100%","background":"black", "margin":"0 auto", "top":"0", "left":"0"});
		$(".jp-progress").show();
		$('#sample-textbox').fadeOut(500);
		$('#sample-textbox').hide();
		$('#tos-button').hide();
		$('#skipPlayer').delay(5000).fadeIn(1000);
	});
}
function tosClicked(){
	$('#tos-button').click(function(){
		tosButton =!tosButton;
		if(tosButton){
			$("#sample-textbox h1").html(content[0].ToS.h1);
			$("#sample-textbox p").html(content[0].ToS.p);
			$("#tos-button").html(content[0].ToS.button2);
		}
		else{
			$("#sample-textbox h1").html(content[0].intro.h1)
			$("#sample-textbox p").html(content[0].intro.p);
			$("#tos-button").html(content[0].intro.button);

		}
		
	});
}
function buildBgMusic(){
	    // Create an audio element, and set it to autoplay, 
   // and show the player when the page loads.
    var audio = $('<audio />', {
      // autoPlay : 'autoplay',
      controls : 'controls',
      loop: 'loop'
    });
     
    // Call our addSource function, and pass in the audio element
    // and the path(s) to your audio.
    // addSource(audio, 'audioFile.ogg');

    audio.appendTo('body'); 

    addSource(audio, content[0].preload.bgMusic);
    $('audio').prop("volume", 0.25);
    $('audio').hide();
}
function addSource(elem, path) {
	$('<source />').attr('src', path).appendTo(elem);
}