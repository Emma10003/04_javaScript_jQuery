$(function () {
    $("#login").click(loginFn);
    $("#goToSignup").click(goToSignup);
});

// 회원가입 버튼 클릭 시 index 페이지에서 회원가입 페이지로 이동
function goToSignup() {
    opener.location.href = "register.html";
    window.close();
}

// 로그인
function loginFn() {
    // 사용자가 입력한 사용자명,비밀번호가 저장된 것과 일치하는지 확인하기 위해 userList 불러옴
    let movieUserList = JSON.parse(
        localStorage.getItem("movieUserList") || "[]"
    );
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();

    if (
        movieUserList.username === username &&
        movieUserList.password === password
    ) {
        // 회원가입 성공
        $(".form").hide();
        $("#successMessage")
            .html(
                `
            로그인 성공! <br>
            ${username}님, 환영합니다.
            `
            )
            .show();
    } else {
        $("#errorMessage")
            .html("사용자명 혹은 비밀번호가 옳지 않습니다.")
            .show();
        // 입력창 리셋
        $("#username, #password, #rememberMe").val("");
    }
}
