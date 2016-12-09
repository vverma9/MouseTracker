// In the following 2D Array list elements are coded as follows:
//left side  	1 2 3 4 5 6 7 8		// which image will appear on the left
//right side 	5 6 7 8 1 2 3 4 	// which image will appear on the right
//cursor 		0 1 0 1 0 1 0 1 	// 0=spider, 1=flower
var immutableList = [[1, 5, 0], [2, 6, 1], [3, 7, 0], [4, 8, 1], [5, 1, 0], [6, 2, 1], [7, 3, 0], [8, 4, 1]]; // first 4 are females and last 4 are females
var completeList = Array.from(immutableList);
var imgPrefix = 'img/face/'; // location of faces in the local
var cursors = ["url('img/cursor/spider.cur'), pointer", "url('img/cursor/flower.png'), pointer"]; //spider=0 & flower=1
var initTime; // to store the initial time for every trial
var numberOfBlocks = 1;
var timesToRepeat = immutableList.length * numberOfBlocks; // repeat the block 10 times
$(document).ready(function () {

    // stop the tracking, log the results
    function stopTracking(event) {
        if (event.target.id == 'left')
            console.log("left pic selected");
        else
            console.log("right pic selected");
        $('#toBeTracked').css('cursor', 'auto');        // change the cursor to default
        $("#left").unbind("mouseenter");                // unbind the mouseenter event from the stimuli, which is binded on line 57
        $("#right").unbind("mouseenter");               // unbind the mousemove to stop mouse tracking
        $('#toBeTracked').unbind("mousemove");          // stop the mouse coordinate tracking
        $('#startTrial').text("Start Trial!");          // change the button text
        if (timesToRepeat > 0) {
            setTimeout(function () {
                enableTrialButton();                    // enable the trial button agaon after 500ms
            }, 500);
        }
        else
            $('#startTrial').text('End of Trials!');    // say that the trials are ended
    }

    var displayStimuli = function () {
        var randIndex = Math.floor(Math.random() * completeList.length);    // generate a random integer governed by the length of the array
        var currTrial = completeList[randIndex];                            // get the current trial values based on the random index generated above
        var leftFace = imgPrefix + currTrial[0] + '.png';                   // get the left face index
        var rightFace = imgPrefix + currTrial[1] + '.png';                  // get the right face index

        console.log("Stimuli= " + currTrial);                               // log what are we showing to the user

        // on the basis of the trial, show the cursor accordingly
        if (currTrial[2] == 0)
            $('#startTrial').text("Drag the spider to one of the photos");
        else if (currTrial[2] == 1)
            $('#startTrial').text("Drag the flower to one of the photos");

        // change the cursor to be shown
        $('#toBeTracked').css('cursor', cursors[currTrial[2]]);
        $('#left').hide().attr('src', leftFace);
        $('#right').hide().attr('src', rightFace);
        $('#left').slideDown();
        $('#right').slideDown();
        if (completeList.length == 1)
            completeList = Array.from(immutableList);   // restart again once a block is finished
        else
            completeList.splice(randIndex, 1);          // else remove the trial from the trial list
        initTime = new Date();                          // get current time
        $('#toBeTracked').mousemove(trackMouseMovement);// enable the mouse coordinate tracking
        $('#left').mouseenter(stopTracking);            // stop the tracking once one of the stimuli is selected
        $('#right').mouseenter(stopTracking);
    };

    var enableTrialButton = function () {
        $('#startTrial').bind('click', function () {
            $(this).unbind("click");                // remove the click functionality from the start button, until one of the stimuli is selected
            timesToRepeat--;
            if (completeList.length > 0)
                displayStimuli();                   // display the stimuli if trials are still remaining
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

        var userX = event.pageX - $('#toBeTracked .panel').offset().left;                   // get the x-coordinate of the user
        var userY = event.pageY - ($('#toBeTracked .panel').offset().top + areaHeight);     // get the y coordinate of the user
        userY *= -1;
        var timeSpent = new Date() - initTime;                                              // find the milli-seconds spent to reach this coordinate position
        console.log("X=" + userX + ",Y=" + userY + ",Time=" + timeSpent + "ms");            // log it in the firebug console
    }

    $('#welcomeMessage').bind('click', function () {
        $(this).addClass('hide');
        $('#toBeTracked').removeClass('hide');
        enableTrialButton();
    });
});