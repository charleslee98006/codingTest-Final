var content;
var tosButton=false;

// jQuery's main function handler.
$( document ).ready(function() {
	setTimeout(function(){
        $("body").addClass("loaded");
    }, 1000);
	buildPage();
	$("#skipPlayer").hide();
	$("#sample-textbox").hide();
	$("#tos-button").hide();
	$("#skipPlayer").delay(6000).fadeIn(2000);
	skipClick();
	repeat();
	tosClicked();
});

// A function that build the components of the page and loads the JSON data.
function buildPage(){
	$.getJSON("https://raw.githubusercontent.com/charleslee98006/CodingTestJSON/master/content.json", function(json) {
		content = json;
		console.log(content);
		console.log(content[0]);
		$("title").text(content[0].preload.title);
		$("html").css({"background": "url(" + content[0].preload.backgroundImg+ ") no-repeat center center fixed"});
		$("#sample-textbox h1").text(content[0].intro.h1);
		$("#sample-textbox p").text(content[0].intro.p);
		$("#tos-button").text(content[0].ToS.button);
		$("#skipPlayer a").text(content[0].preload.skip);
		buildBgMusic();
		buildPlayer();
		buildFlashError();
	});
};

// A function that build the jQuery video and audio plugin called - jPlayer .
function buildPlayer(){
      $("#jquery_jplayer_1").jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", {
            m4v: content[0].preload.video,
          });
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

//function that transitions to the main page when user clicks on the skip button.
function skipClick(){
	$("#skipPlayer").click(function(){
		transitVid();
	});
}

//function that changes the video player from full screen and allow other content to appear on the browser. Also,
//handles IE10 size difference. The background music  component starts to play.
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
	$("#skipPlayer").fadeOut(500);
	$("#skipPlayer").hide();
    $( ".jp-video" ).fadeIn( 1000);
    $("#sample-textbox").fadeIn(1500);
    $("#tos-button").fadeIn(1500);
    $(".jp-progress").hide();
    $("audio").trigger("play");
}

//function that changes the video into full screen when the user clicks on the repeat. The background music pauses.
function repeat(){
	$(".jp-play").click(function(){
		$("audio").trigger("pause");
		$( "#container" ).css({"width":"100%", "height":"100%","background":"black", "margin":"0 auto", "top":"0", "left":"0"});
		$(".jp-progress").show();
		$("#sample-textbox").fadeOut(500);
		$("#sample-textbox").hide();
		$("#tos-button").hide();
		$("#skipPlayer").delay(5000).fadeIn(1000);
	});
}

//function that handles the Terms of Service (ToS) and changes the texts back and forth between ToS and  intro filler text.
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

//function that builds the html audio component
function buildBgMusic(){
	// Create an audio element, and set it to autoplay, 
	// and show the player when the page loads.
    var audio = $("<audio />", {
      autoPlay : "autoplay",
      controls : "controls",
      loop: "loop"
    });
    audio.appendTo("body"); 
    addSource(audio, content[0].preload.bgMusic);
    $("audio").prop("volume", 0.25);
    $("audio").hide();
}

//function that appends the audio source to the HTML5 audio component.
function addSource(elem, path) {
	$("<source />").attr("src", path).appendTo(elem);
}
//function that adds text to the Flash out of date error message.
function buildFlashError(){
	$(".jp-no-solution span").text(content[0].error.title);
	$(".jp-no-solution p").text(content[0].error.p);
	$(".jp-no-solution a").text(content[0].error.a);

}