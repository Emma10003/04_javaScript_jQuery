// 사용자 샘플 데이터
// DB -> Java -> 프론트엔드로 데이터를 가져오거나
// 프론트엔드 -> Java -> DB 에서 소비자가 요청한 데이터가 존재하는지 확인
// 존재한다면 DB -> Java -> 프론트엔드로 데이터를 전달 / 없으면 전달할 것이 없음

$(function () {
    // 로그인 버튼을 클릭했을 때 ajax를 작동!
    $("#로그인기능").click(function (e) {
        // 1. button 제출 방지
        e.preventDefault(); // submit 잠시 멈춤 -> 정규식이나 비밀번호/아이디 일치하는지 확인하고 제출
        const abc = $("#username").val(); // username 안에 소비자가 작성한 값(id)이 들어있음.
        const password = $("#password").val();

        $.ajax({
            url: "../json/data.json", // json 파일이 위치한 곳으로 url 주소 설정
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log(
                    "성공적으로 json에서 가져온 데이터 확인하기 : ",
                    data
                );
                // 만약에 json에서 확인한 데이터와 소비자가 작성한 데이터가 일치한다면
                /*
                javascript 에서 [] / . 으로 데이터를 주고받을 때의 차이
                users[abc] = abc의 변수의 값이 admin인 속성을 찾을 때 사용.

                users.abc = 속성명이 고정된 문자열일 때 사용
                -> users 안에 abc 라는 id가 존재하는지를 찾음.

                users[abc]
                -> users 안에 abc 라는 변수 이름으로 가져온 값이 존재하는지를 찾음.

                예를 들어 username.value 값으로 admin 이 들어왔을 경우
                users[abc] -> users[admin] 으로 변경되어 admin과 일치하는 아이디를 검색
                */
                if (data.users[abc].password === password) {
                    // 1. 데이터가 존재할 경우
                    $("#result").html(
                        `로그인 성공! 환영합니다. ${data.users[abc].name} 님`
                    );
                    $("#로그인기능").hide();
                    $("#로그아웃기능").show();
                } else {
                    // 2. 데이터가 사용자가 작성한 아이디 비밀번호와 일치하지 않기 때문에
                    // 데이터를 가져올 수 없을 경우 -> '일치하지 않는 고객이 존재하지 않습니다.'
                    $("#result").html("일치하는 아이디나 비밀번호가 없습니다.");
                }
            },
            error: function () {
                alert("데이터 가져오는 데 실패했습니다.");
            },
        });
    });

    $("#로그아웃기능").click(function (e) {
        // 로그아웃을 진행할 경우
        $("#로그아웃기능").hide(); // 로그인기능 show 보여주기
        $("#로그인기능").show(); // 로그아웃기능 버튼 hide 숨기기 설정
    });
});

// $.ajax({
//         url: "../json/data.json", // json 파일이 위치한 곳으로 url 주소 설정
//         method: "GET",
//         dataType: "json",
//         success: function (data) {
//             console.log("성공적으로 json에서 가져온 데이터 확인하기: ", data);
//             // 만약에 json에서 확인한 데이터와 소비자가 작성한 데이터가 일치한다면
//             // 1. 데이터를 무사히 url에 접속해서 가져왔는데 데이터가 존재하지 않을 경우

//             // 2. 데이터가 사용자가 작성한 아이디 비밀번호와 일치하지 않기 때문에
//             // 데이터를 가져올 수 없을 경우 -> '일치하지 않는 고객이 존재하지 않습니다.'

//             // 3. 데이터가 존재할 경우
//         },
//         error: function () {
//             alert("데이터 가져오는 데 실패했습니다.");
//         },
//      });
