$(function () {
    // 1. 중복확인 버튼 클릭 시 팝업 열기
    $("#emailCheck").click(function () {
        // 팝업 설정
        const popupWidth = 450;
        const popupHeight = 450;
        // TODO: 화면 중앙에 팝업 띄우기
        const left = (window.screen.width - popupWidth) / 2;
        const top = (window.screen.height - popupHeight) / 2;

        // 여러 개 옵션 담아주기
        const options = `
        width = ${popupWidth}
        height = ${popupHeight}
        left = ${left}
        top = ${top}
        `;

        // 팝업창으로 열릴 html 문서 연결해주기
        window.open("24_emailCheck.html", "_blank", options);
    });

    // 2. 회원가입 폼 제출
    $("#signupForm").submit(function (e) {
        e.preventDefault();
        // TODO:
        // - 입력값 가져오기
        const emailCheck = $("#emailCheck").val();
        const phone = $("#phone").val();

        // - localStorage에 저장
        const newUser = {
            email: emailCheck,
            phone: phone,
        };

        const userList = JSON.parse(localStorage.getItem("userList") || "[]");
        userList.push(newUser);

        localStorage.setItem("userList", JSON.stringify(userList));

        // - 성공 메시지 표시
        alert("회원가입이 정상적으로 이루어졌습니다.");
    });
});
