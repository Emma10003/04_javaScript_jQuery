// 1. 강아지사진을 클릭하지 않아도 랜덤으로 1장 보이게 설정
// https://api.thecatapi.com/v1/images/search
// https://dog.ceo/api/breeds/image/random = 1장
// 결과 : <img src="">

// 어디서든 현재페이지를 확인할 수 있도록 전역변수 설정
let 현재페이지 = 1;

$(function () {
    // 강아지 사진이 무조건 랜덤으로 1장 출력
    randomDog();
    // 강아지 사진 이미지를 클릭할 경우 강아지 사진을 랜덤으로 1장 변경
    $("#dogResult").click(randomDog);
    // 고양이 사진이 무조건 랜덤으로 10장 출력 (?limit=10)
    getCats();

    // 페이지네이션 버튼 이벤트
    $("#prevBtn").click(function () {
        if (현재페이지 > 1) {
            현재페이지--;
            getCats(); // 고양이 이미지 가져오는 함수
        } else {
            alert("첫 번째 페이지입니다.");
        }
    });

    $("#nextBtn").click(function () {
        현재페이지++;
        getCats();
    });
});

function randomDog() {
    // 1장 -> [0] 사용안함
    $.get("https://dog.ceo/api/breeds/image/random").done(function (data) {
        $("#dogResult").html(
            `
                <img src="${data.message}">
                `
        );
    });
}

function getCats() {
    // https://api.thecatapi.com/v1/images/search?limit=10
    $.get("https://api.thecatapi.com/v1/images/search?limit=10").done(function (
        data
    ) {
        const catList = data
            .map(
                (cat) =>
                    `
                    <div class="cat-card">
                        <img src="${cat.url}" 
                            class="cat-detail" 
                            onclick="showFullImg('${cat.url}')">
                    </div>
                    `
            )
            .join(""); // 사진 사이에 나오는 콤마(,) 삭제
        // cat[현재페이지].url -> [현재페이지] 삭제 (이 부분을 넣으면 작동하지 X) ~> why...
        $("#catResult").html(catList);
    });
}

// 이미지 클릭 시 큰 이미지로 보여주기
function showFullImg(imageUrl) {
    $("#catResult").prepend(
        `
        <div id="abc" class="cat-modal" onclick="closeFullImg()">
            <img src="${imageUrl}" class="cat-detail-show">
        </div>
        `
    );
}

// 크게 보이는 이미지 없애기 - 이미지를 한 번 더 클릭하면 삭제됨
// close(), open() 과 같이 이미 만든 예약어 메서드나 함수 명칭은 사용 지양!!
// 각 회사 개발자가 만든 듯한 명칭으로 함수 메서드나 변수이름을 만드는 것이 좋음.
function closeFullImg() {
    $("#abc").remove();
}
