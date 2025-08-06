$(function () {
    $("#goToLogin").click(gotoLogin);
    $("#signup").click(signup);
    $(".back-link").click(goToMain);
});

// 메인으로 돌아가기
function goToMain() {
    window.location.href = "index.html"; // 현재페이지에서 주소에 해당하는 문서를 연다
}

// 회원가입하기 -- 내가 작성한 코드
// function signUpFn() {

//     // 새로운 정보 추가할 리스트 불러오기 (없으면 빈 배열)
//     let movieUserList = JSON.parse(
//         localStorage.getItem("movieUserList") || "[]"
//     );
//     const username = $("#username").val().trim();
//     const email = $("#email").val().trim();
//     const password = $("#password").val().trim();
//     const confirmPassword = $("#confirmPassword").val().trim();

//     // 비밀번호가 일치하지 않는 경우
//     if (!(password === confirmPassword)) {
//         alert("비밀번호가 일치하지 않습니다.");
//         $("#confirmPassword").val("");
//         $("#confirmPassword").focus();
//         return;
//     }

//     if (!(username || email || password || confirmPassword)) {
//         $("#errorMessage").html("모든 항목을 입력해주세요.").show();
//         return;
//     }

//     const newUser = {
//         username: username,
//         email: email,
//         password: password,
//     };

//     // 새로운 값 추가
//     movieUserList.push(newUser);

//     // .setItem()으로 저장할 때 JSON.stringify() 잊지말기!!!
//     localStorage.setItem("movieUserList", JSON.stringify(movieUserList));

//     // 입력창 초기화
//     $("#username, #email, #password, #confirmPassword").val("");

//     // 회원가입 완료 문자 띄우기
//     $("#successMessage").html("회원가입이 완료되었습니다.").show();

//     // 메인 페이지로 돌아가기
//     window.location.href = "index.html";
// }

function signup() {
    hideMessages();

    const username = $("#username").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const confirmPassword = $("#confirmPassword").val().trim();

    // 사용자 정보 저장
    const users = JSON.parse(localStorage.getItem("movieUserList") || "[]");

    const newUser = {
        id: Date.now(), // ms 값을 이용하여 고객 가입 id번호로 활용
        username: username,
        email: email,
        password: password,
        createAt: new Date().toLocaleString("ko-KR"), // Date()에 소괄호 붙이는 거 잊지말기!!
    };

    users.push(newUser); // javaScript 에 localStorage 에서 가져온 리스트 추가

    // 추가된 데이터 localStorage에 업로드
    /*
        localStorage.setItem(JSON.stringify(users));
            Uncaught TypeError: Failed to execute 'setItem' on 'Storage':
            2 arguments required, but only 1 present
            : setItem() 내부 파라미터(=매개변수) 2개가 들어가야 하는데 오직 하나만 들어갔습니다.
                그래서 크롬 storage에 저장하는 데 문제가 발생했습니다.
    */
    localStorage.setItem("movieUserList", JSON.stringify(users));
    alert("회원가입이 완료되었습니다.");
    window.location.href = "index.html";
}

function hideMessages() {}

// 이미 계정이 있는 경우 -> 로그인 화면으로 이동
function gotoLogin() {
    window.open("login.html", "_blank", "width=450,height=600");
    window.location.href = "index.html";
}
