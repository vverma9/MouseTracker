(function() {
    "use strict";

    //document.getElementById('toBeTracked').onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y
        // are, calculate pageX/Y - logic taken from jQuery
        // Calculate pageX/Y if missing and clientX/Y available
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Add a dot to follow the cursor
        dot = document.createElement('div');
        dot.className = "dot";
        dot.style.left = event.pageX + "px";
        dot.style.top = event.pageY + "px";
        document.body.appendChild(dot);
    }

    $('#welcomeMessage').on('click', function(){
        $(this).addClass('hide');
        $('#toBeTracked').removeClass('hide');
    });
    // In the following 2D Array list elements are coded as follows:
    //left side  	1 2 3 4 5 6 7 8		// which image will appear on the left
    //right side 	5 6 7 8 1 2 3 4 	// which image will appear on the right
    //cursor 		0 1 0 1 0 1 0 1 	// 0=spider, 1=flower
    var completeList = [ [1,5,0], [2,6,1], [3,7,0], [4,8,1], [5,1,0], [6,2,1], [7,3,0], [8,4,1] ];
    var rand = Math.floor(Math.random() * completeList.length);
    var imgPrefix = 'img/face/';
    var cursors = ["url('img/cursor/spider.cur'), pointer", "url('img/cursor/flower.png'), pointer"];

    $('#startTrial').on('click', function(){
        //url(http://cur.cursors-4u.net/nature/nat-6/nat523.ani), url(http://cur.cursors-4u.net/nature/nat-6/nat523.png), default !important
        $('#toBeTracked').css('cursor', cursors[0]);
    });
})();