// In the following 2D Array list elements are coded as follows:
//left side  	1 2 3 4 5 6 7 8		// which image will appear on the left
//right side 	5 6 7 8 1 2 3 4 	// which image will appear on the right
//cursor 		0 1 0 1 0 1 0 1 	// 0=spider, 1=flower
var completeList = [[1, 5, 0], [2, 6, 1], [3, 7, 0], [4, 8, 1], [5, 1, 0], [6, 2, 1], [7, 3, 0], [8, 4, 1]];
var imgPrefix = 'img/face/';
var cursors = ["url('img/cursor/spider.cur'), pointer", "url('img/cursor/flower.png'), pointer"];
var initTime; // to store the initial time for every trial

$(document).ready(function () {
    function stopTracking() {
        $('#toBeTracked').css('cursor', 'auto');
        $("#left").unbind("mouseenter");
        $("#right").unbind("mouseenter");
        $('#toBeTracked').unbind("mousemove");
        setTimeout(function () {
            enableTrialButton();
        }, 2000);
    };

    var displayStimuli = function () {
        var randIndex = Math.floor(Math.random() * completeList.length);
        var currTrial = completeList[randIndex];
        var leftFace = imgPrefix + currTrial[0] + '.png';
        var rightFace = imgPrefix + currTrial[1] + '.png';
        $('#toBeTracked').css('cursor', cursors[currTrial[2]]);
        $('#left').attr('src', leftFace);
        $('#right').attr('src', rightFace);
        completeList.splice(randIndex, 1);
        initTime = new Date(); // get current time
        $('#toBeTracked').mousemove(trackMouseMovement);
        $('#left').mouseenter(stopTracking);
        $('#right').mouseenter(stopTracking);
    };

    var enableTrialButton = function () {
        $('#startTrial').bind('click', function () {
            $(this).unbind("click");
            if (completeList.length > 0)
                displayStimuli();
        });
    };

    function trackMouseMovement(event) {
        var eventDoc, doc, body;
        var areaHeight = $('#toBeTracked .panel').height();
        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are, calculate pageX/Y - logic taken from jQuery, Calculate pageX/Y if missing and clientX/Y available
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0 );
        }

        var userX = event.pageX - $('#toBeTracked .panel').offset().left;
        var userY = event.pageY - ($('#toBeTracked .panel').offset().top + areaHeight);
        userY *= -1;
        var timeSpent = new Date() - initTime;
        console.log("X=" + userX + " Y=" + userY + "Time=" + timeSpent + "ms");
    }

    $('#welcomeMessage').bind('click', function () {
        $(this).addClass('hide');
        $('#toBeTracked').removeClass('hide');
        enableTrialButton();
    });
});