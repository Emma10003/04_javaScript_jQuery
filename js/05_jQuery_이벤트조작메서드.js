$(function () {
    // #add 버튼을 클릭했을 때
    // #boxArea에 .append("<div class='box'>박스</div>") 추가

    // #del 버튼을 클릭했을 때
    // $(".box:last").remove() 마지막에 존재하는 요소 삭제
    $("#add").click(function () {
        $("#boxArea").append("<div class='box'>박스</div>");
    });

    $("#del").click(function () {
        $(".box:last").remove();
    });
});
