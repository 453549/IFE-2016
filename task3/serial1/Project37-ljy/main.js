/**
 * Created by Lijinyao on 2016/4/11.
 */
function $(selector){
    return document.querySelector(selector);
}


window.onload = function () {

    console.log("hello");
    $(".dialog-window-cancel").addEventListener("click", function () {
        $(".dialog").style.display='none';
    }, false);
    $(".dialog-window-commit").addEventListener("click", function () {
        $(".dialog").style.display='none';
    }, false);

    $(".show-dialog").addEventListener("click", function () {
        $(".dialog").style.display='block';
        $(".dialog").style.opacity='1';
    },false);

    $(".dialog").addEventListener("click", function (e) {
        if(e.target== this){
            $(".dialog").style.display='none';
        }

    }, false);
};