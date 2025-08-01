$(function () {
    // .click() 내부에 함수를 작성할 때 : 기능명칭만 작성하고 ()는 제외
    // 특별히 메서드 내부에 함수를 작성하지 않고, 단독으로 함수를 작성할 때는
    // 기능명칭();      형태로 작성
    // 로그아웃 버튼이 html에 존재한다는 가정
    $("#loginBtn").click(loginCheck);
    $("#logoutBtn").click(logoutCheck);

    /*    
    // 로그아웃 버튼이 html에 존재하지 않는다는 가정
    let isLoggedIn = false;
    $("#loginBtn").click(function () {
        if (isLoggedIn) {
            logoutCheck();
        } else {
            loginCheck();
        }
    });
     */
});

function loginCheck() {
    // 1. html 내부에 소비자가 작성한 값을 가져오기 위해서 val() 메서드 활용
    const username = $("#username").val();
    const password = $("#password").val();

    if (!username || !password) {
        // username과 password가 아무것도 적혀있지 않다면
        $("#loginResult").html(
            `
            <div class="error"> 아이디와 비밀번호를 입력하세요.</div>
            `
        );
        return; // if문을 탈출한 후 아래에 작성한 코드를 실행하지 못하도록 돌려보내기!!!
    }

    $("#loginResult").html(`<div class="loading">로그인 중입니다...</div>`);

    // $.get()을 이용해서 json 에 해당하는 username과 password가 일치하는지 확인
    const URL = "../json/userInfo.json";
    $.get(URL)
    // function (data) {} 익명함수를 idPwCheck 함수 이름으로 변경 후 done 내부에서 idPwCheck 함수 호출하여 사용
        .done(function (data) {  // 기능을 굳이 나누지 않고 .done() 안에 작성하는 게 제일 좋다
            // "admin", "user" 같은 걸 어떻게 변수로 처리하는지 헷갈렸는데
            // 일치가 아니라 사용자가 입력한 username이 json 파일 안에 존재하는가 여부로 풀면 됨!
            //  ~> data.users[username] 방식으로 ([]로 인덱싱하는 걸 잊지말자...)
            if (
                data.users[username] &&
                data.users[username].password === password
            ) {
                // 1. form-group 숨김처리, loginBtn -> 로그아웃 버튼으로 변경
                $(".form-group").hide(); // class="form-group"이니까 "#" 아니고 "."
                $("#loginBtn").hide(); // 로그인 버튼 숨김
                $("#logoutBtn").show(); // 로그아웃 버튼 보임
                // $("#loginBtn").text("로그아웃");  // -> 2번 방법을 사용했을 때

                $("#loginResult").html(
                    `
            <div class="success">
                <p><strong>로그인 성공!</strong></p>
                <p>${username}님, 환영합니다.</p>
            </div>
            `
                );
            } else {
                $("#loginResult").html(
                    `
            <div class="error"> 아이디 또는 비밀번호가 일치하지 않습니다.</div>
            `
                );
            }
        })
        .fail();
}

// 2. 로그아웃 버튼 클릭했을 경우 form-group 보이고 로그인 버튼으로 변경
function logoutCheck() {
    // 입력필드 초기화
    $("#username").val("");
    $("#password").val("");

    // UI 원래대로 복구
    $(".form-group").show();
    $("#loginBtn").show(); // 1번 방법
    $("#logoutBtn").hide(); // 1번 방법
    // $("loginBtn").text("로그인");  // -> 2번 방법을 사용했을 때 (logoutBtn이 없는 경우)

    // 로그아웃 메세지 표시
    $("#loginResult").html(
        `<div class="success">로그아웃이 완료되었습니다.</div>`
    );

    // 1초 후에 로그아웃 메세지 사라지게 하기 (보통은 0.5~1초 사이로 설정함)
    // 1000 = 1초
    /*
        setTimeout(기능, 시간)
    */
    setTimeout(function () {
        $("#loginResult").html(""); // 메세지 없애기
    }, 1000);
}

function idPwCheck(data) {
    
}