// https://www.themealdb.com/api/json/v1/1/random.php

$(function () {
    // loadWatch();
    $("#btn").click(loadWatch);
});

function loadWatch() {
    $.get("https://www.themealdb.com/api/json/v1/1/random.php").done(function (
        data
    ) {
        const meal = data.meals[0]; // 1. API 결과에서 첫 번째 음식 정보 가져오기

        if (meal) {
            // 2. 음식이 존재한다면
            const youtubeUrl = meal.strYoutube; // 3. 유튜브 링크가 들어있는 문자열 가져오기
            // .replace() : 특정 문자열을 다른 문자열로 변환
            // .replace("변경될 문자열", "삽입할 문자열")

            let videoHTML = "";
            if (youtubeUrl) {
                const embedURL = youtubeUrl.replace("watch?v=", "embed/");
                console.log("embedURL: ", embedURL);
                $("#result").html(
                    (videoHTML = `
                <div class="video-container">
                    <iframe
                        src="${embedURL}"
                        frameborder="0"
                        allow="accelerometer; 
                        autoplay; 
                        clipboard-write; 
                        encrypted-media; 
                        gyroscope; 
                        picture-in-picture;
                        allowfullscreen>
                    </iframe>
                </div>
                `)
                );
            } else {
                videoHTML = $("#result").html(
                    "<div>영상이 존재하지 않습니다.</div>"
                );
            }
        } else {
            $("#result").html(`${videoHTML}`);
        }
    }); // function, .done()
}

// const watchURL = "https://www.youtube.com/watch?v=nbfNyZbdn2I";
// const iframeURL =
//     "https://www.youtube.com/embed/nbfNyZbdn2I?si=jRG0fqbZXJOvShrQ";
// watchURL 의 'watch?v=' 뒤와
// iframeURL의 'embed/' 뒤는 동일 -> replace로 바꿔준다!
// iframeURL의 ? 뒤는 위치추적

// 유튜브 '퍼가기' 로 가져온 코드
