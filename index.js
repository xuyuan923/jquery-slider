$(document).ready(function(){
    var list = document.getElementById('list');
    var buttons = $('#buttons span');
    var index = 1;
    var len = 5;
    var animated = false;
    var interval = 3000;
    var timer;

    function animate (offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;
        var inteval = 10;
        var speed = offset/(time/inteval);
        var left = parseInt(list.style.left) + offset;

        var go = function (){
            if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            }
            else {
                list.style.left = left + 'px';
                if(left>-200){
                    list.style.left = -1600 * len + 'px';
                }
                if(left<(-1600 * len)) {
                    list.style.left = '-1600px';
                }
                animated = false;
            }
        }
        go();
    }

    function showButton() {
        for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }

    function play() {
        timer = setTimeout(function(){
            next();
            play();
        }, interval);
    }
    function stop() {
        clearTimeout(timer);
    }
    function next(){
        if (animated) {
            return;
        }
        if (index == 5) {
            index = 1;
        }
        else {
            index += 1;
        }
        animate(-1600);
        showButton();
    }
    $("#next").click(next);
    $("#prev").click(function(){
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 5;
        }
        else {
            index -= 1;
        }
        animate(1600);
        showButton();
    })

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].click = function () {
            if (animated) {
                return;
            }
            if($(this).attr('class') == 'on'){
                resturn;
            }
            var myIndex = parseInt(this.attr('index'));
            var offset = -1600 * (myIndex - index);
            animate(offset);
            index = myIndex;
            showButton();
        }
    }
    $("#container").mouseover(function(){
        stop();
    });
    $("#container").mouseout(function(){
        play();
    });
    play();
});