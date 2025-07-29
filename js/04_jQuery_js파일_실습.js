/* 네비게이션 메뉴 */
$(function () {
    $("#menu li").click(function () {
        $("#menu li").removeClass("active");
        $(this).addClass("active"); // this는 function(){} 안에서만 가능! 화살표 함수에서는 사용불가
    });
});
/*
this : 이벤트(행위, 행동) 발생한 HTML 요소를 가리킴
#menu li : id가 menu인 <ul> 태그 내부의 모든 <li> 태그에 클릭 이벤트 설정.

this : 사용자가 클릭한 <li> 태그만 바라봄.
        단순히 #menu li = this 인 것이 아니라
        this는 사용자가 감지한 위치를 가리키기도 함.
        $("#menu li").removeClass("active");
            -> menu 안에 존재하는 모든 li 태그를 바라본다면
        $(this).addClass("active");
            -> 사용자가 클릭한 menu li 태그만 바라보는 것.
*/

/* 문의 양식 */
// -- 문의 양식 제출 기능
$(function () {
    $("#btn").click(() => {
        // 1. 각 입력 필드의 값을 가져와서 앞 뒤 공백을 제거
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const message = $("#message").val().trim();

        // 2. 값 중 하나라도 비어있는지 확인
        // addClass, removeClass를 활용해서 4순위 class 스타일 추가하고 적용 설정
        // <style> 클래스 명칭: .red, .green
        if (name && email && message) {
            // 모든 값이 채워져 있다면 성공 메세지를 초록색으로 표시
            $("#status")
                .text("문의가 정상적으로 접수되었습니다.")
                .addClass("green")
                .removeClass("red");
        } else {
            $("#status")
                .text("모든 항목을 입력해주세요.")
                .addClass("red")
                .removeClass("green");
        }
    });
});
