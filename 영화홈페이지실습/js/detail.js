$(function () {
    // 상세보기에 해당하는 id를 index.js에서 ?로 전달받아 $.get 주소에서 사용
    /*
    URLSearchParams = 자바스크립트 개발자 자체에서 추가적으로 필요한 기능으로 판단하여 만든 내장객체
    ? 뒤에 오는 값이 파라미터.

    URL     Search      Params
    주소에서 검색하여    파라미터들을 가져오다.

    어떤 주소에서 검색한 다음 파라미터를 가져오는가?
    -> 현재는 window.location.search 에서 가져온다.
    window          . location         . search
    현재 컴퓨터에서  . 현재 주소 위치에서 . 검색한다음

    .get("?뒤에 작성된 키 이름")
            키 명칭을 가져올 것이다. 키 명칭을 가져와서 키 명칭 내부 안에 작성된 값을 
    전달받은id확인 이라는 변수이름에 담아둘 것이다.
    */
    const 전달받은id확인 = new URLSearchParams(window.location.search).get(
        "id"
    );
    console.log("id값 : ", 전달받은id확인);

    loadMovieDetail();
});

function loadMovieDetail(전달받은id확인) {
    // id로 전달한 고유id를 확인해서 상세보기창으로 이동 가능
    $.get(`https://ghibliapi.vercel.app/films/${전달받은id확인}`).done(
        function (data) {
            무비상세보기(data);
        }
    );
}

function 무비상세보기(movie) {
    $("#movieTitle").text(movie.title);
}
