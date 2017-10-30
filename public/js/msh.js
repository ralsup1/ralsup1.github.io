// JavaScript Document
var currentElement;
var to; // timeout
var mo = true; // mouseover

function clog(t)
{
	console.log(t);
}

//make life easier
function getId(id) 
{ 
	return document.getElementById(id); 
}

/* Show/Hide Functions */
function changeVis(id)
{	
	var e = getId(id);
	if(e.style.display == "block"){ e.style.display = "none"; }
	else if(e.style.display == "none" || e.style.display == ""){ e.style.display = "block"; }
}
function show(id)
{
	var e = getId(id);	
	if(e!=null)
		e.style.display = "block";
}

function hide(id)
{	
	var e = getId(id);	
	if(e!=null)
		e.style.display = "none";
}

//Alerts,Confirms, Loading

var alertwindow = getId("alertWindow");
var alerttext;
var confirmpop = getId("confirm");

function mshAlert(msg)
{
	var alertpop = getId("alerttext");
	alerttext = msg;
	alertpop.innerHTML = msg;
	
	show("alertwindow");
	show("alert");	
}



var confirmNextStep;
var confirmpop;
var button1; var button2;
var button1text; var button2text;
var confirmtext;

function mshConfirm(msg,b1,b2,nextStepFunc)
{
	confirmpop = getId("confirm");
	button1 = getId("ConfirmButton1");
	button2 = getId("ConfirmButton2");
	confirmtext = getId("confirmtext");
	
	button1text = b1;
	button2text = b2;
	alerttext = msg;
	
	confirmtext.innerHTML = msg;
	button1.innerHTML = button1text;
	button2.innerHTML = button2text;
	
	confirmNextStep = nextStepFunc;
	
	show("alertwindow");
	show("confirm");
	
}
function closeMshAlert()
{
	alerttext = "";
	hide("alertwindow");
	hide("alert");
}

function closeMshConfirm()
{
	button1text = "";
	button2text = ""; 
	confirmNextStep = null;
	hide("alertwindow");
	hide("confirm");
}

var loadingNextStep;
var loadingpop;
var loadingtext;
var cancloseloading = false;

function mshLoading(msg)
{
	loadingpop = getId("mshloading");
	loadingtext = getId("loadingtext");	
	
	loadingtext.innerHTML = msg;	
	
	show("alertwindow2");
	show("mshloading");
	show("loadingani");	
}

function finishMshLoading(msg)
{
	loadingtext = getId("loadingtext");	
	loadingtext.innerHTML = msg;
	
	hide("loadingani");	
	
	$("#alertwindow2").click(function()
	{
		if(cancloseloading)
		{
			closeMshLoading();					
		}
	});
	
	$("#mshloading").mouseenter(function(){cancloseloading = false;});
	$("#mshloading").mouseleave(function(){cancloseloading  = true;});
}

function closeMshLoading()
{
	loadingtext = getId("loadingtext");	
	loadingtext.innerHTML = "";
	$("#alertwindow2").fadeOut(300);
	$("#mshloading").fadeOut(300);	
	loadingNextStep = null;

}




//-----



function clearContent(id)
{
	var e = getId(id);
	e.innerHTML = "";	
}

function checkEmptyness(str)
{
	//if(str=="" )
		return false;	
}	

// Onfocus function for a text field; par1 = parameter onfocus, par2 = parameter onblur, textfield = the textfield element
function textfieldfocus(textfield,par1,par2)
{
	if(textfield.value == par2) textfield.value = par1;
	else if(textfield.value == par1) textfield.value = par2;
	
	textfield.onblur = function(){if(textfield.value == "") textfield.value = par2; }
}

function textfieldfocuswithoutblur(textfield,par1,par2)
{
	if(textfield.value == par2) textfield.value = par1;
	else if(textfield.value == par1) textfield.value = par2;
}

function textfieldblur(textfield,par1,par2)
{
	if(textfield.value == "") textfield.value = par2;
}

var loadcheck = false;
function displayLoading(displayid)
{
	if(!loadcheck)
	{
		var ele = getId(displayid);
		getId(displayid).innerHTML = "<div style='text-align:center;margin:25px auto;position:relative;' id='"+displayid + "_loading'><img src='http://" + location.host + "/public/img/loading.gif' border=0 alt='loading' /></div>";
		loadcheck = true;
	}
}

function appendLoading(displayid)
{
	var ele = getId(displayid);
	if(ele == null)
		getId(displayid).innerHTML += "<div style='text-align:center;' id='"+displayid + "_loading'><img src='http://" + location.host + "/public/img/loading.gif' border=0 alt='loading' /></div>";
}

function hideLoading(displayid)
{
	removeElement(getId(displayid + "_loading"));
	loadcheck = false;
}	


/* Bits Stuff */

function extractNumber(value) 
{ 
	var n = parseInt(value); 
	return n == null || isNaN(n) ? 0 : n; 
}

function getValueOf(id) 
{ 
	return getId(id).value;
} 

function getInnerHtml(id)
{
	return getId(id).innerHTML;	
}

function removeElement(e)
{	
	if(e!=null)
		e.parentNode.removeChild(e);	
}

// remove Element from array
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function checkAlphanum(str)
{
	if (!str.match(/^[0-9a-z]+getId/))
	  return false;
}

//select the text inside an element from position s to e
function textSelect(inp, s, e) {
	e = e || s;
	if (inp.createTextRange) {
		var r = inp.createTextRange();
		r.collapse(true);
		r.moveEnd('character', e);
		r.moveStart('character', s);
		r.select();
	}else if(inp.setSelectionRange) {
		inp.focus();
		inp.setSelectionRange(s, e);
	}
}



//turn a text field into an input field and vice-versa; note the names of the elements!
function makeInput(value,what)
{	
		if(what=="text")
		{
			var n = getId(value + "_input");
			n.style.display = "none";
			
			var ei = getId(value + "_input_field");
	
			var e = getId(value + "_text");
			if(value!="")
			{
				e.innerHTML = ei.value;
				e.style.display = "block";
			}
			
		}
		else if(what=="input")
		{
			var e = getId(value + "_input");
			e.style.display = "block";
			var ei = getId(value + "_input_field");
			textSelect(ei,ei.value.length);
	
			var n = getId(value + "_text");
			if(value!="")
			{	
				n.style.display = "none";
				n.innerHTML = ei.value;
			}
		}
	
}

// define a custom getElementsByClassName Function for older browsers
if (document.getElementsByClassName == undefined)
{
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:getId|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) 
		{
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

function swap(arr,a,b) // a,b = indices
{
	temp = swap[a];
	swap[a] = swap[b];
	swap[b] = temp;
	
}

function searchKey(arr,key)
{
	for(i = 0;i<arr.length;i++)
	{
		if(arr[i] == key)
			return i;
	}
	
}

function basename(path, suffix) {
	 // http://kevin.vanzonneveld.net
	  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Ash Searle (http://hexmen.com/blog/)
	  // +   improved by: Lincoln Ramsay
	  // +   improved by: djmix
	  // *     example 1: basename('/www/site/home.htm', '.htm');
	  // *     returns 1: 'home'
	  // *     example 2: basename('ecra.php?p=1');
	  // *     returns 2: 'ecra.php?p=1'
	  if(typeof(path) != "undefined")
	  {
		  var b = path.replace(/^.*[\/\\]/g, '');
		
		  if (typeof(suffix) == 'string' && b.substr(b.length - suffix.length) == suffix) {
			b = b.substr(0, b.length - suffix.length);
		  }
		
		  return b;
	  }
	  else return false;

}

// Strpos returns the position of needle in haystack
// returns false, if needle is not found
function strpos(haystack, needle, offset) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Onno Marsman
  // +   bugfixed by: Daniel Esteban
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
  // *     returns 1: 14
  var i = (haystack + '').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}

// sendFormWithEnter submits a form if the enter button is pressed
// the form is not submitted if shift & enter are pressed together
function sendFormWithEnter(ele,formid)
{
	var form = getId(formid);
	ele.onkeydown = function(e)
	{
		e = e || window.event;
		var key = e.keyCode || e.which || e.charCode, Shift = e.shiftKey || Event.SHIFT_MASK
		/*, Alt = Event.ALT_MASK || e.altKey, Ctrl = Event.CONTROL_MASK || e.ctrlKey*/;
		if(key == 13 && Shift!==true){
		form.submit();
		return false;
		}
	}
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}

function wheel(e) {
  preventDefault(e);
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

var preloadimages = new Array()
function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		preloadimages [i] = new Image()
		preloadimages [i].src = preload.arguments[i]
	}
}

function checkInputRegEx(event,inputf)
{
	if(event.keyCode > 47)
	{ 
		var regex = new RegExp("[A-Z0-9._-]");
		var c = String.fromCharCode(event.keyCode);
		if(regex.test(c)==true)
		{
			inputf.style.backgroundColor = "#fff";
			inputf.style.color = "#777777";
			return true;
		}
		else{
			inputf.value  = inputf.value.substr(0,inputf.value.length-1);
			inputf.style.backgroundColor = "#cc3232";
			inputf.style.color = "#fff";
			return false;
		}
	}
	else return true;
}

function checkInputString(event,inputf)
{
	var l = inputf.value.length;
	var regex = new RegExp("[A-Z0-9._-]");
	
	for(i=0;i<l;i++)
	{
		if(!regex.test(inputf.value.charAt(i)))
		{
			inputf.value.replace(inputf.value.charAt(i),'');
		}
		
	}
}

function addDots(str,m)
{
	if(str.length > m)
	{
		return str.substr(0,m)+"...";	
	}
	else return str;
		
}

//from duke
//Stack Overflow
function openInNewTab(url)
{
  var win=window.open(url, '_blank');
  win.focus();
}

//from Philippe Leybaert
//Stackoverflow
function Create2DArray(rows) {
	var arr = [];
	
	for (var i=0;i<rows;i++) {
	 arr[i] = [];
	}
	
	return arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}


/*function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return Math.floor((Date.now() - birthday) / (31556926000));
}*/

function calcAge(dateString)
{
	birthDate = new Date(dateString);
    otherDate = new Date(Date.now());

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }

    return years;	
}

/*
Date.prototype.getAge = function (dateString) {
	var date = +new Date(dateString);
    if (!date) date = new Date();
    var feb = (date.getMonth() == 1 || this.getMonth() == 1);
    return ~~((date.getFullYear() + date.getMonth() / 100 + 
        (feb && date.getDate() == 29 ? 28 : date.getDate())
        / 10000) - (this.getFullYear() + this.getMonth() / 100 + 
        (feb && this.getDate() == 29 ? 28 : this.getDate()) 
        / 10000));
}
*/

/*
function calcAge(dateString) { // birthday is a date
 	var birthday = +new Date(dateString);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}*/

//Grid
//enterprisbug.github.com/grid.js#v1.1
(function(window, document, undefined) {
	function mergeWithDefaultValues(obj) {
		for (var i = 1; i < arguments.length; i++) {
			var def = arguments[i];
			for (var n in def) {
				if (obj[n] === undefined) {
					obj[n] = def[n];
				}
			}
		}
		return obj;
	}

	var defaults = {
		distance : 50,
		lineWidth : 1,
		gridColor : "#000000",
		caption : true,
		font: "10px Verdana"
	};
	
	/** The constructor */
	var Grid = function Grid(o) {
		if (!this.draw) return new Grid(o);
		this.opts = mergeWithDefaultValues(o || {}, Grid.defaults, defaults);
	};
	
	Grid.defaults = {};
	mergeWithDefaultValues(Grid.prototype, {
		draw: function(target) {
			var self = this;
			var o = self.opts;
			
			if (target) {
				target.save();

				target.lineWidth = o.lineWidth;
				target.strokeStyle = o.gridColor;
				target.font = o.font;
				
				if (target.canvas.width > target.canvas.height) {
					until = target.canvas.width;
				} else {
					until = target.canvas.height;
				}

				for (var y = 0; y <= until; y += o.distance) {
					target.beginPath();
					if (o.lineWidth == 1.0) { 
						target.moveTo(0, y + 0.5); 
						target.lineTo(target.canvas.width, y + 0.5);
					} else { 
						target.moveTo(0, y); 
						target.lineTo(target.canvas.width, y);
					}
					target.closePath();
					target.stroke();
					if (o.caption)
					{
						target.fillText(y, y, 10);
					}
				}
				
				for (var x = 0; x <= until; x += o.distance) {
					target.beginPath();
					if (o.lineWidth == 1.0) { 
						target.moveTo(x + 0.5, 0);
						target.lineTo(x + 0.5, target.canvas.height);
					} else {
						target.moveTo(x, 0);
						target.lineTo(x, target.canvas.height);
					}
					target.closePath();
					target.stroke();
					if (o.caption)
					{
						target.fillText(x, 0, x);
					}
				}
				
				target.restore();
			}
		}
	});

  window.Grid = Grid;

})(window, document);


Array.prototype.containsArray = function(val) {
	var hash = {};
	for(var i=0; i<this.length; i++) {
		hash[this[i]] = i;
	}
	return hash.hasOwnProperty(val);
}
	
function indexOf2d(arr, val) {
	
	if(Array.isArray(arr))
	{
		for(i=0;i<arr.length;i++)
		{
			if(Array.isArray(arr[i]))
			{
				if(arr[i][0] == val[0])
				{
					if(arr[i][1] == val[1])
					{
						return i;	
					}
				}
				
			}
			else
			{
				continue;	
			}
		}
	}
	
	return -1;
}

Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

/* Auto expand text areas */
$(document).on('focus.textarea', '.autoExpand', function(){
		var savedValue = this.value;
		this.value = '';
		this.baseScrollHeight = this.scrollHeight;
		this.value = savedValue;
	})
	.on('input.textarea', '.autoExpand', function(){
		var minRows = this.getAttribute('data-min-rows')|0,
			 rows;
		this.rows = minRows;		
		rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
		this.rows = minRows + rows;
	});



function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function getViewportOffset($e) {
  var $window = $(window),
    scrollLeft = $window.scrollLeft(),
    scrollTop = $window.scrollTop(),
    offset = $e.offset(),
    rect1 = { x1: scrollLeft, y1: scrollTop, x2: scrollLeft + $window.width(), y2: scrollTop + $window.height() },
    rect2 = { x1: offset.left, y1: offset.top, x2: offset.left + $e.width(), y2: offset.top + $e.height() };
  return {
    left: offset.left - scrollLeft,
    top: offset.top - scrollTop,
    insideViewport: rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 && rect1.y1 < rect2.y2 && rect1.y2 > rect2.y1
  };
}


function setButtonEnabled(buttonid,v)
{
	if(v)
	{
		var button = getId(buttonid);
		button.disabled = false;
		button.style.opacity = 1.0;
		button.style.cursor = "pointer";
		button.setAttribute("class", "stdbutton"); 
	}
	else
	{
		var button = getId(buttonid);
		button.disabled = true;		
		button.style.opacity = 0.2;
		button.style.cursor = "default";
		button.setAttribute("class", "stdbuttondisabled"); 
	}
}


function getId(id) 
{ 
	return document.getElementById(id); 
}


function isset ()
{
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FremyCompany
    // +   improved by: Onno Marsman
    // +   improved by: Rafał Kukawski
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true

  var a = arguments,
    l = a.length,
    i = 0,
    undef;

  if (l === 0)
  {
    throw new Error('Empty isset');
  }

  while (i !== l)
  {
    if (a[i] === undef || a[i] === null)
    {
      return false;
    }
    i++;
  }
  return true;
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


/* THX to https://gist.github.com/TBD/1900572 */

var MLexpression = /[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#!]*[\w\-\@?^=%&amp;/~\+#])?/g
var MLregex = new RegExp(MLexpression);

function makeLink(s) 
{    
  l = s.match(MLregex)
  if (l) {                 
    s = s.replace(/https?:\/\//,"")
    $(l).each(function(ss){      
      s = s.replace(l[ss],"<a href='http://#'>#</a>".replace(/#/g,l[ss]))
    })  
  }
  return s
}  


