$(function () {
    $(".back-link").click(goToMain);
    $("#goToLogin").click(goToLoginFn);
    $("#signup").click(signUpFn);
});

// 메인으로 돌아가기
function goToMain() {
    window.location.href = "index.html"; // 현재페이지에서 주소에 해당하는 문서를 연다
}

// 이미 계정이 있는 경우 -> 로그인 화면으로 이동
function goToLoginFn() {
    window.location.href = "login.html";
}

// 회원가입하기
function signUpFn() {
    // 새로운 정보 추가할 리스트 불러오기 (없으면 빈 배열)
    let movieUserList = JSON.parse(
        localStorage.getItem("movieUserList") || "[]"
    );
    const username = $("#username").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const confirmPassword = $("#confirmPassword").val().trim();

    // 비밀번호가 일치하지 않는 경우
    if (!(password === confirmPassword)) {
        alert("비밀번호가 일치하지 않습니다.");
        $("#confirmPassword").val("");
        $("#confirmPassword").focus();
        return;
    }

    const newUser = {
        username: username,
        email: email,
        password: password,
    };

    // 새로운 값 추가
    movieUserList.push(newUser);

    // .setItem()으로 저장할 때 JSON.stringify() 잊지말기!!!
    localStorage.setItem("movieUserList", JSON.stringify(movieUserList));

    // 입력창 초기화
    $("#username, #email, #password, #confirmPassword").val("");

    // 회원가입 완료 문자 띄우기
    $("#successMessage").html("회원가입이 완료되었습니다.").show();

    // 메인 페이지로 돌아가기
    window.location.href = "index.html";
}
