$(document).ready(function () {
    var video = document.getElementById('video');
    var videoControls = $(".video-controls");
    var currentTime = 0;
    var isPlaying = false;
    function hideControls() {
        if (video.paused) {
            return;
        }
        videoControls.addClass('hide');
        video.controls = false;
    }
    function showControls() {
        videoControls.removeClass('hide');
        video.controls = true;
    }
    function hideQualitySettingDropdown(){
        if($(".settings-dropdown-content").hasClass("show")){
            $(".settings-dropdown-content").removeClass("show");
        }
    }
    function changeVideoQuality(){
        currentTime = video.currentTime;
        video.src = $(this).attr("src");
        setTimeout(function(){
            video.currentTime=currentTime;
            video.play();
        }, 500);
        $(".settings-dropdown-content").toggleClass("show");
    }
    function bindEvents(){
        $(".settings-dropdown-btn").on("click", function(event){
            event.stopPropagation();
            event.preventDefault();
            $(".settings-dropdown-content").toggleClass("show");
        });
        $(video).on("click", function(event){
            event.stopPropagation();
            hideQualitySettingDropdown();
        })
        $(document).on("click", function(){
            hideQualitySettingDropdown();
        })
        $(video).on('mouseenter', showControls);
        $(video).on('mouseleave', hideControls);
        videoControls.on('mouseenter', showControls);
        videoControls.on('mouseleave', hideControls);
        $(".video-quality").on("click", changeVideoQuality);
        video.addEventListener('loadedmetadata', function() {
            //video.currentTime=currentTime;
            console.log("loadedmetadata");
        }, false);
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

  
