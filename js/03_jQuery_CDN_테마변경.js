// ready 가 아닌 현대 방식의 웹문서 기능 설정 환경
$(() => {
    // toggleBtn 클릭했을 때 화살표 익명함수로
    // toggleClass 활용해서 dark-mode로 변경하기
    $("#toggleBtn").click(() => {
        $("body").toggleClass("dark-mode"); // toggleClass 쓸 땐 .dark-mode로 쓰지 X (. 없어도 됨)
    });
});
