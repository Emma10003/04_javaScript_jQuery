$(function () {
    // 1. 확인 버튼 클릭 시 중복 체크
    $("#check").click(function () {
        const email = $("#childEmail").val();

        // TODO:
        // - localStorage에서 users 가져오기
        let userList = JSON.parse(localStorage.getItem("userList") || "[]");
        // - 중복 확인
        const isDup = userList.filter((u) => u.email === email);
        // userList의 각 요소들을 한 번씩 u로 담아와서 그 안에 있는 email(u.email)이
        // 사용자가 작성한 email과 일치하는 email들을 isDup에 (배열로)담음

        // filter 는 배열로 데이터를 가져오기 때문에 .length 로 값이 한개라도 존재하는가 비교해야 함.
        if (isDup.length === email) {
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
