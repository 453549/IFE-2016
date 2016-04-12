
var prompt = {
    
    showPrompt: function() {
        $("#prompt").style.display = "block";
    },

    hidePrompt: function() {
        $("#prompt").style.display = "none";
    },

    changePrompt: function() {
        $("#prompt-window").style.marginTop = document.body.clientHeight * 0.4 + "px";
        $("#prompt-window").style.marginBottom = document.body.clientHeight * 0.4 + "px";
        $("#prompt-window").style.marginLeft = document.body.clientWidth * 0.3 + "px";
        $("#prompt-window").style.marginRight = document.body.clientWidth * 0.3 + "px";
    }
}

function delegateEvent() {

    addEvent($("#prompt-show"), "click", prompt.showPrompt);

    addEvent($("#prompt"), "click", function(e) {
        e = e || window.event;
        var tagChild = e.srcElement || e.target;
        if (!(tagChild.id == "prompt-header" || tagChild.id == "prompt-body" || tagChild.id == "prompt-title")) {
            prompt.hidePrompt();
        }
    });

    addEvent(window, "resize", prompt.changePrompt);
}

window.onload = function() {
    prompt.changePrompt();
    delegateEvent();
}