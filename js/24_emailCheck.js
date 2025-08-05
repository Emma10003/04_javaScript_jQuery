$(function () {
    // 1. 확인 버튼 클릭 시 중복 체크
    $("#check").click(function () {
        const email = $("#childEmail").val();

        // TODO:
        // - localStorage에서 users 가져오기
        let userList = JSON.parse(localStorage.getItem("userList") || "[]");
        // - 중복 확인
        const isDup = userList.some((u) => u.email === email);
        // (filter)
        //  userList의 각 요소들을 한 번씩 u로 담아와서 그 안에 있는 email(u.email)이
        // 사용자가 작성한 email과 일치하는 email들을 isDup에 (배열로)담음

        /*
            .includes() : 문자열이나 배열에서 특정 값이 포함되어 있는지 확인하는 메서드
                         filter보다 더 많이 검색에서 사용

            .filter() : 조건에 맞는 모든 요소를 배열로 반환 ---------- (결과로 목록, 배열 리턴)
                        검색 / 수정할 때 많이 사용
                        filter 는 배열로 데이터를 가져오기 때문에
                            .length 로 값이 한개라도 존재하는가 비교해야 함.

            .some()   : 조건에 맞는 요소가 하나라도 있으면 true ------ (결과로 boolean   리턴)

            .find()   : 조건에 맞는 첫 번째 요소만 반환
        */
        // if (isDup.length > 0) {  filter를 사용할 때는 .length와 비교 필요
        if (isDup) {
            // .some(): 리스트에 해당하는 값이 존재하면 이미 true -> 추가 조건 작성 X
            // - 결과 메시지 표시
            $("#result").html(
                `<span style="color:red;"> 이미 사용중인 이메일입니다.`
            );
            $("#send").prop("disabled", true); // disabled 활성화/비활성화 코드
        } else {
            // - 중복되지 않으면 "사용하기" 버튼 활성화
            $("#result").html(
                `<span style="color:green;"> 사용 가능한 이메일입니다.`
            );
            $("#send").prop("disabled", false);
        }
    });

    // 2. 사용하기 버튼 클릭
    $("#send").click(function () {
        // 자식창(이메일중복학인)에 입력한 값을 email 변수로 가져옴(담아둠)
        // const childEmail = $("#childEmail").val(); -> 코드 한 줄로 줄이기 위해 생략

        // 순수 자바스크립트와 jQuery 언제든지 혼용 가능!

        // - 부모창의 이메일 입력란에 값 전달 --------------------------------------------------
        /* 순수 자바스크립트 조합                               =     jQuery 조합            */
        // opener.document.getElementById("inputEmail").value = $("#childEmail").val();

        // 최종 //
        /* jQuery 조합                                    = jQuery 조합 */
        opener.$("#inputEmail").val($("#childEmail").val());
        // jQuery는 javascript와는 달리 .val()에 값을 할당할 수 X -> .val() 안에 넣어주기!
        //
        /*
            opener 자체가 자식창을 열었을 때, 소비자가 자식창에 입력한 값을
            부모창에 전달하겠다는 것.

            부모창의 요소를 opener.document.getElementById("inputEmail").value 로 지정해주고
            그 값에 자식창에서 선언한 변수인 email을 전달.
        */
        //-----------------------------------------------------------------------------------
        // - 팝업창 닫기
        window.close();
    });
});

/*
    open   : 열다 / 무언가를 여는 행위
    메인html 에서
    window.open("팝업창.html")
    -> 메인html에서 '팝업창.html'을 열어준다.


    opener : 열어준 것 / 개방자 / 오픈, 주최한 자

    팝업창html 을 열어준 메인html을 의미

    opener.document.querySelector("선택자")
    opener           .document . querySelector("선택자")
    나를열어준메인html.문서에서  . 선택자에 해당하는 태그

    opener.document.querySelector("#inputEmail").value                =  document.querySelector("#childEmail").value
    : 나를 열어준 signup.html 에서 아이디가 inputEmail 에 해당하는 값에  ↑  현재 emailCheck.html에서 childEmail 내에 작성한 값을
                                                                      |
                                                                      |
                                                              value 로 전달하겠다.

*/
