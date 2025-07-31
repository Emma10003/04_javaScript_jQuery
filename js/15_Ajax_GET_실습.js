// 7/31 실습코드 1 (css,html,url 참고)

// jQuery 이벤트 처리와
// 기능명칭으로 분류하여 기능 호출하기

    // 이전에는 click() 안에 익명함수를 썼는데,
    // 이제는 함수를 따로 정의하고, .click() 안에는 정의된 함수를 넣어준다!

// ==================================================================================
// 문제 1: 기본 텍스트 데이터 가져오기
// https://jsonplaceholder.typicode.com/posts/1

// '게시물 제목 가져오기' 버튼(=id가 btn1인 버튼) 클릭했을 때 문제1번기능() 호출
$(function(){
    $("#btn1").click(문제1번기능); 
})
// 함수 정의
function 문제1번기능() {
    $.get(
        "https://jsonplaceholder.typicode.com/posts/1", // url 주소
        // url 주소를 가져오는데 성공!
        function (data) {
            $("#result1").html(
                `
                <div class="success">
                    <strong>게시물 제목: </strong> ${data.title} <br><br>
                    <strong>게시물 내용: </strong> ${data.body}
                </div>
                `
            );
        }
    );
}
// ==================================================================================
// 문제 2: 사용자 정보 표시하기
// https://jsonplaceholder.typicode.com/users
// https://jsonplaceholder.typicode.com/users/{userId}

// 버튼 클릭 시 함수 호출
$(function(){
    $("#btn2").click(userInfo);
})
// 함수 정의
function userInfo(){
    const ui = $("#userId").val(); // 사용자가 작성한 값 -> 숫자 타입
     
    /* $.get().done().fail() 형태 */
    $.get(`https://jsonplaceholder.typicode.com/users/${ui}`)  // 여기에서 ${ui}로 특정 사용자 api 페이지로 이동
    // 1. 데이터를 무사히 가져오는 것을 성공
    .done(function(data) {
            // 데이터를 가져올 수 있도록 접속하는 데 성공!

            if (!data.id || !data) {  // data.id를 찾을 수 없거나, data에 접속하지 못했다면
                $("#result2").html(
                    `<div class=error>해당 사용자를 찾을 수 없습니다.</div>`
                );
                return;  // 데이터가 없으므로 function 아래 기능을 사용하지 못하도록 돌려보내기
                         // (돌려보내기 하지 않으면 아래 코드로 넘어가서, #result2 부분이 덮어쓰기 됨)                         
            }

            $("#result2").html(                                // => ${data.}에서 굳이 리스트 인덱싱 할 필요 X
                `
                <div class="success">
                    <strong>이름 : </strong> ${data.name}<br>
                    <strong>이메일 : </strong> ${data.email}<br>
                    <strong>전화번호 : </strong> ${data.phone}<br>
                </div>
                `
                // username = 닉네임 아이디  name = 이름
            )
        })
    // 2. 아예 주소로 접근 자체가 불가능한 에러 상태일 때
    .fail(function(){
        // url 접근 자체가 불가능한 상황
        $("#result2").html(
            `
            <div class="error">
                해당 사용자를 찾을 수 없습니다. (404 error 발생)
                주소 자체 접속이 안되는 상황
            </div>
            `
        );
    });
}
// ==================================================================================
// 문제 3: 랜덤 명언 가져오기
// https://api.quotable.io/random
// http://api.quotable.io/random

// 버튼 클릭 시 함수 호출
$(function(){
    $("#btn3").click(getRandom);
})
// 함수 정의
function getRandom(){
    // 1. get을 이용해서 데이터 가져올 주소 설정
    $.get('https://api.quotable.io/random')
    .done(    // 데이터 가져오는 데 문제가 없을 경우
        function(data){
            $("#result3").html(
            `
            <div class="success">
            <blockquote>${data.content}</blockquote>
            <strong> ${data.author}</strong>
            </div>
            `
            )
        }
    )   
    .fail(    // 데이터 주소 접속 실패했을 경우
        $("#result3").html(
            `
            <div class="error">
            명언을 가져오는데 실패했습니다.
            </div>
            `
        )
    )
}