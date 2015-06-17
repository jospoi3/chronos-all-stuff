/*
----------------------------------------------------------------
Module: Helpers
Description: Différents helpers pour le javascript
Auteur: Libéo
Version: 1.0.0
Dernière modification: 5 février 2015
----------------------------------------------------------------
*/

var $body=$("body"),$document=$(document);$body.on("keydown",function(a){var b=window.event?a.which:a.keyCode;$body.attr("data-state")||(9===b||13===b||37===b||38===b||39===b||40===b)&&($body.attr("data-state","keyboard"),$document.trigger("keyboardnavigation"))});var classes=["is-clicked","is-hover"],elements=["a","button","input"].toString(),focusFunc=function(a){var b=$(this),c="click"===a.type?classes[0]:classes[1];$(b.get(0).tagName.toLowerCase()+"."+c).removeClass(c),"mouseleave"!==a.type&&b.addClass(c)};$body.on("click mouseenter mouseleave",elements,focusFunc),$document.on("keyboardnavigation",function(){for(var a=0;a<classes.length;a++)$("."+classes[a]).length&&$("."+classes[a]).removeClass(classes[a]);$body.off("click mouseenter mouseleave",elements,focusFunc)}),$document.on("fontresize",$.proxy(function(){var a=$body.attr("class")?_.filter($body.attr("class").split(" "),function(a){return-1===a.indexOf("is-font-")?a:void 0}):"",b=parseInt($body.css("font-size").replace("px",""),10);a&&$body.attr("class","").addClass(a.join(" ")),b>16?$body.addClass("is-zoomed is-font-"+b):$body.removeClass("is-zoomed")},this)).trigger("fontresize");
