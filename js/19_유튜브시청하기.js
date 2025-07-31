// https://abhi-api.vercel.app/api/search/yts?text=heat+waves
// 검색버튼 무시, 바로 나오는 영화 확인하도록
// $.get(URL).done(
//     function (data) {
//         $("#results").html(
//             `
//         <div class="movie-card">
//             <p><strong>영화제목</strong> : ${data.result.title}</p>
//             <p><strong>영화설명</strong> : <br>${data.result.description}</p>
//             <img src="${data.result.thumbnail}">
//             <p><strong>주소 </strong>: ${data.result.url}</p>
//         </div>
//         `
//         );
//     }
// );

// $.get()
// .done()

// results 에
// <p> 영화제목
// <p> 영화설명
// <img> 썸네일
// <p> 주소
const URL = "../json/youtube.json";

// 검색 버튼 클릭했을 때 기능 수행
$(function () {
    $("#searchButton").click(searchYoutube);
});

// 검색 기능
function searchYoutube(){
    $.get(URL).done(
        function (data) {
            const search = $("#searchInput").val();  // heat waves
            
            if (data && data.result.title==search) {
                // 입력창에 입력한 값과 json 문서 상의 title이 일치한다면
                $("#results").html(
                    `
                <div class="movie-card">
                    <p class=><strong>영화제목</strong> : ${data.result.title}</p>
                    <p><strong>영화설명</strong> : <br>${data.result.description}</p>
                    <img src="${data.result.thumbnail}">
                    <p><strong>주소 </strong>: ${data.result.url}</p>
                </div>
                `
                );
            } else {
                $("#results").html("해당하는 데이터가 없습니다.")
            }
        }
    );
}
