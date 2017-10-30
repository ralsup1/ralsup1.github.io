//General variables

var uploading = false;



// ----------

var godeep;
var pixelate;
var headerbg;

$(document).ready(function()
{
	godeep = $(".godeep");
	pixelate = $(".pixelate");
	headerbg = $(".headerbg");
	makeFullScreen()	
});

function makeFullScreen()
{
	if($(window).width() > 900)
	{	
		if($(window).height() < 500)
		{
			var h = 500;	
		}
		else
		{
			var h = $(window).height(); //70 = footer height
		}
		
		$(".fullscreen").css("width",$(window).width());
		$(".fullscreen").css("height",h);
		$(".fullscreenheight").css("height",h);
		
	}
	else
	{
		$(".fullscreen").css("width","auto");
		$(".fullscreen").css("height","auto");	
	}

}

$(window).resize(makeFullScreen);


//print the thumbnail of an image based on the passed json
function getThumbnail(j)
{
	var img = $('<img id="'+j.id+'">'); //Equivalent: $(document.createElement('img'))
	img.attr('src', j.filepath);
	
	return img;
}

function triggerRipple(x,y)
{
	t = $('.rippledpi');
	t.css("z-index",1000);
	
	var $div = $('<div/>'),
			xPos = x,
			yPos = y;
	
	$div.addClass('ripple-effectdpidepixed');
	var $ripple = $(".ripple-effect");
	
	$div
	.css({
	  top: yPos - ($ripple.height()/2),
	  left: xPos - ($ripple.width()/2),
	  background: $(this).data("ripple-color")
	}) 
	.appendTo(t);
	
	window.setTimeout(function(){
		$div.remove();
		t.css("z-index",0);
	}, 200);
	
}