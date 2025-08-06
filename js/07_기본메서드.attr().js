$(function () {
    // 1. 이미지 속성 변경
    $("#changeImage").click(imgFn);
    $("#changeAlt").click(altFn);

    // 2. 링크 주소 변경
    $("#changeLink").click(linkFn);

    // 3. 입력창 속성
    $("#disableInput").click(disInputFn);
    $("#enableInput").click(enInputFn);

    // 4. 체크박스 상태
    $("#checkAttr").click(attrFn);
    $("#checkProp").click(propFn);

    // 5. 데이터 속성
    $("#setData").click(setFn);
    $("#getData").click(getFn);
});
// -----------------------------------------------------------------------------------------
/* 1. 이미지 속성 변경 */
function imgFn(e) {
    e.preventDefault();
    // 버튼을 클릭했을 때 원래 이미지 - 바뀐 이미지를 토글?하려면 어떻게 해야 하지
    $("#moviePoster").attr("src", "../img/red-apple.png");
}
function altFn(e) {
    e.preventDefault();
    $("#moviePoster").attr("alt", "변경된 alt 설명 속성 테스트");
    alert("alt 속성이 변경되었습니다. F12를 눌러 확인하세요.");
    $("#moviePoster").attr("id", "logo");
    alert("id 속성이 변경되었습니다. F12를 눌러 확인하세요.");
}

/* 2. 링크 주소 변경 */
function linkFn(e) {
    e.preventDefault();
    $("#link").attr("href", "https://google.com");
}

/* 3. 입력창 속성 */
function disInputFn(e) {
    e.preventDefault();
    // $("#textInput").attr("disabled", "disabled");
    // $("#textInput").attr("disabled", true);
    // $("#textInput").attr("disabled", "");
    // $("#textInput").addClass("disabled"); // disabled 클래스에 지정한 css 속성 적용하기
    // ↓↓ 한 번에 작성하기 ↓↓
    $("#textInput").attr("disabled", "").addClass("disabled");
    //  위 모두 다 가능한 방법!
    // 안 되는 경우에는 input 속성으로 disabled 넣기
}
function enInputFn(e) {
    e.preventDefault();
    // $("#textInput").removeAttr("disabled");
    // $("#textInput").removeClass("disabled");
    // ↓↓ 한 번에 작성하기 ↓↓
    $("#textInput").removeAttr("disabled").removeClass("disabled"); // 속성과 적용된 css 지움
}

/* 4. 체크박스 상태 */
/*
    .attr()
        HTML 코드에 써진 속성 초기값 그대로 보임
        속성을 설정할 때 변경사항까지 작성해야 함.
    .prop()
        사용자와 상호작용하며 현재 상태를 확인할 수 있음
*/
function attrFn(e) {
    e.preventDefault();
    const checked = $("#checkbox").attr("checked");
    // attr로 체크되었을 때 속성변경을 원한다면
    // $("#checkbox").attr("checked", "checked");
    // $("#checkbox").attr("checked", true);
    // $("#checkbox").attr("checked", "");
    // 로 변경할 속성 설정값까지 추가해야 함.
    alert(".attr() 결과 : " + (checked || "없음"));
    // html <input>에 'checked'를 추가하지 않으면 체크박스 체크 여부와 관계없이 false
    // 반대도 마찬가지
}
function propFn(e) {
    e.preventDefault();
    const checked = $("#checkbox").prop("checked");
    alert(".prop() 결과 : " + checked); // 체크->true, 해제->false
}

/* 5. 데이터 속성 */
function setFn(e) {
    e.preventDefault();
    $("#dataElement").attr("data-id", "12345");
    alert("data-id가 설정되었습니다.");
}
function getFn(e) {
    e.preventDefault();
    const dataId = $("#dataElement").attr("data-id");
    alert("data-id : ", dataId || "없음");
}
