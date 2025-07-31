// 7/31 실습코드 1 (css,html,url 참고)

// jQuery 이벤트 처리와
// 기능명칭으로 분류하여 기능 호출하기

    // 이전에는 click() 안에 익명함수를 썼는데,
    // 이제는 함수를 따로 정의하고, .click() 안에는 정의된 함수를 넣어준다!

// ==================================================================================
// 버튼 클릭 시 함수 호출
$(function(){
    $("#btn1").click(문제1번기능); 
    $("#btn2").click(userInfo);
    $("#btn3").click(getRandom);
    $("#btn4").click(getComments);
    $("#btn5").click(errorFn);
})
// ==================================================================================
// 문제 1: 기본 텍스트 데이터 가져오기
// https://jsonplaceholder.typicode.com/posts/1
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
// ==================================================================================
// 문제 4: 댓글 .length 개를 성공적으로 가져왔다 띄워주기
// https://jsonplaceholder.typicode.com/posts/1/comments
function getComments(){
    $.get("https://jsonplaceholder.typicode.com/posts/1/comments")
    .done(
        function(data){  // 여기에 data 쓰는 거 잊지 말 것,,
            $("#result4").html(
                `
                <div class="success">
                    댓글 ${data.length} 개를 성공적으로 불러왔습니다. <br><br>
                    <strong>첫 번째 댓글 : </strong><br>${data[0].body}
                </div>
                `
            ) // .html
        } // function
    ) // .done
    .fail(
        function() {
            $("#result4").html(
            `
            <div class="error">
                댓글을 불러오는 데 실패했습니다.
            </div>
            `
            ) // .html
        } // function
        
    ) // .fail
}
// ==================================================================================
// 문제 5: 에러 처리하기
// https://jsonplaceholder.typicode.com/posts/999999
function errorFn(){
    $.get('https://jsonplaceholder.typicode.com/posts/999999')
    .done(
        function(data){
            $("#result5").html(
                `
                <div class="success">
                    데이터를 성공적으로 가져왔습니다.
                </div>
                `
            ) // .html
        } // function
    ) // .done
    .fail(
        // error 가 발생했을 때도 매개변수(파라미터) 자리에
        // data 라는 변수이름을 사용해도 되지만, 개발자 간의 규칙으로
        // err 나 xhr 과 같은 명칭을 사용해주는 것이 바람직하다
        function(xhr){
            $("#result5").html(
                `
                <div class="error">
                에러 발생 ! <br>
                <strong>상태 코드 : </strong>${xhr.status}<br>
                <strong>에러메세지 : </strong>${xhr.statusText}<br>
                </div>
                `
            ) // .html
        } // function
    ) // .fail
}