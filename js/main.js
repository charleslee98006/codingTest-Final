var content;
var tosButton=false;
var vidFinished=true;
$( document ).ready(function() {
	buildPage();
	buildPlayer();
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
		$("#sample-textbox h1").text(content[2].intro[0].h1);
		$("#sample-textbox p").text(content[2].intro[1].p);
	});
	buildBgMusic();
};	
function buildPlayer(){
      $("#jquery_jplayer_1").jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", {
            m4v: "vid/sampleMassEffect.mp4",
            poster: "images/sample.png"
          }).jPlayer("play");
        },
        swfPath: "/js",
        supplied: "m4v",
        size: {
          width: "100%",
          height: "100%"
        },
        autohide:{
        	restored: true, fadeIn:500,
        },
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
    	$( "#jp_container_1" ).css({"width":"800px", "height":"575px","background":"none", "margin":"10px", "top":"150px", "left":"100px"});
    	$("#sample-textbox").css({"top":"160px", "left":"950px"});
    	$("#tos-button").css({"top":"610px", "left":"1225px"});
	}
	else{
		$( "#jp_container_1" ).css({"width":"800px", "height":"575px","background":"none", "margin":"10px", "top":"100px"});
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
		$( "#jp_container_1" ).css({"width":"100%", "height":"100%","background":"black", "margin":"0 auto", "top":"0", "left":"0"});
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
			$("#sample-textbox h1").text(content[3].ToS[0].h1);
			$("#sample-textbox p").text(content[3].ToS[1].p);
			$("#tos-button").text(content[3].ToS[2].button);
		}
		else{
			$("#sample-textbox h1").text(content[2].intro[0].h1);
			$("#sample-textbox p").text(content[2].intro[1].p);
			$("#tos-button").text(content[2].intro[2].button);

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

    addSource(audio, './sound/bgmusic.mp3');
    $('audio').prop("volume", 0.25);
    $('audio').hide();
}
function addSource(elem, path) {
	$('<source />').attr('src', path).appendTo(elem);
}