var iframe = $('<iframe class="oAuthIFrame"></iframe>').appendTo('body');
iframe.attr('src', "https://angularjs.org/");

$('#test').append('<iframe class="temp2"></iframe>');
$('#temp2').attr('src', "https://angularjs.org/");
$('<iframe />').attr('src', 'http://www.google.com'); 

console.log("fuck");
