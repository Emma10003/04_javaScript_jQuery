$(function () {
    // 1. 확인 버튼 클릭 시 중복 체크
    $("#check").click(function () {
        const email = $("#childEmail").val();

        // TODO:
        // - localStorage에서 users 가져오기
        const userList = JSON.parse(localStorage.getItem("userList") || "[]");
        // - 중복 확인
        if (userList.email === email) {
            // - 결과 메시지 표시
            alert("존재하는 아이디입니다!");
        } else {
            // - 중복되지 않으면 "사용하기" 버튼 활성화
            $("#send").show();
        }
    });

    // 2. 사용하기 버튼 클릭
    $("#send").click(function () {
        // TODO:
        // - 부모창의 이메일 입력란에 값 전달
        const emailCheck = email.val();
        opener.$("#inputEmail").val() = emailCheck;
        // opener 자체가 자식창을 열었을 때, 소비자가 자식창에 입력한 값을
        // 부모창에 전달하겠다는 것.
        // - 팝업창 닫기
        window.close();
    });
});
