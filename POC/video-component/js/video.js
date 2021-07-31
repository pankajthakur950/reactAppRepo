$(document).ready(function () {
    var video = document.getElementById('video');
    var videoControls = $(".video-controls");
    function hideControls() {
        if (video.paused) {
        return;
        }
        videoControls.addClass('hide');
    }
    function showControls() {
        videoControls.removeClass('hide');
    }
    function changeVideoQuality(){
        var currentTime = video.currentTime;
        video.src = $(this).attr("src");
        video.currentTime=currentTime;
        video.play();
        $(".settings-dropdown-content").toggleClass("show");
    }
    function bindEvents(){
        $(".settings-dropdown-btn").on("click", function(){
            $(".settings-dropdown-content").toggleClass("show");
        });
        video.addEventListener('mouseenter', showControls);
        video.addEventListener('mouseleave', hideControls);
        videoControls.on('mouseenter', showControls);
        videoControls.on('mouseleave', hideControls);
        $(".video-quality").on("click", changeVideoQuality);
    }
    function init(){
        bindEvents();
    }
    init();
});
function playHDVideo(){
    var video = document.getElementById("video");
    var currentTime = video.currentTime;
    video.src = "assets/videos/big_buck_bunny_720p_2mb.mp4";
    video.currentTime=currentTime;
    video.play();
}
function playRegularVideo(){
    var video = document.getElementById("video");
    var currentTime = video.currentTime;
    video.src = "assets/videos/big_buck_bunny_720p_2mb_regular.mp4";
    video.currentTime=currentTime;
    video.play();
}

  
