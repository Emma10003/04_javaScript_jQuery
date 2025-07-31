// jQuery 이벤트 처리
$(function () {
    $("#btn1").click(getCats);
    $("#btn2").click(getDogs);
    $("#btn3").click(getSelectedAnimal);
    $("#btn4").click(getCatsWithCount);
    $("#btn5").click(getRandomGallery);
});

// 문제 1: 고양이 사진 3장 가져오기
function getCats() {
    $("#result1").html(
        '<div class="loading">🐱 고양이 사진을 가져오는 중...</div>'
    );

    // 여기에 코드 작성
    // cataas.com API 사용: https://cataas.com/cat?{번호}
    // https://api.thecatapi.com/v1/images/search?limit=3
    // 3장의 고양이 사진을 가져와서 표시하세요

    /* 
            힌트:
            1. 배열을 만들어서 3개의 고양이 사진 URL 생성
            2. map()을 사용해서 HTML 생성
    */
    $.get("https://api.thecatapi.com/v1/images/search?limit=3")
    .done(function (data) {
        // limit = 3 장이어도 무조건 10장이 나오는 사이트!!!!
        // 이럴 때 3장만 가져오는 방법
        // .slice(시작할 인덱스 번호, 종료하고 난 다음 인덱스 번호)
        const threeCats = data.slice(0,3);  // 0번부터 3이 되기 전까지 가져오기 (0~2번 인덱스까지 3개)
        $("#result1").html(
            threeCats.map(
                (cat) =>
                    `
                    <div class="photo-item">
                        <img src="${cat.url}">
                        <p>고양이 ID: ${cat.id}</p>
                    </div>
                    `
            )
        );
    });
}

// 문제 2: 강아지 사진 5장 가져오기
function getDogs() {
    $("#result2").html(
        '<div class="loading">🐶 강아지 사진을 가져오는 중...</div>'
    );

    // 여기에 코드 작성
    // picsum.photos API 사용하거나 다른 강아지 API 사용
    // https://api.thedogapi.com/v1/images/search?limit=3
    // 5장의 강아지 사진을 가져와서 표시하세요

    /*
            힌트:
            0. slice() 이용해서 0번부터 4번까지 가져오기 설정
            1.map()으로 5개 배열 생성
            2. 각각 다른 강아지 사진 URL 만들기
            3. photo-grid 클래스와 photo-item 클래스 사용
    */
   
   $.get("https://api.thedogapi.com/v1/images/search?limit=3")
   .done(
        function(data){ // (1) 주소에 성공적으로 접속했을 때 수행할 기능 -> data로 api를 받아서
            const fiveDogs = data.slice(0,5); // (2) data를 기준으로 요소를 5개 슬라이싱 한 뒤에
            $("#result2").html(  // (3) result2 자리에 아래 내용을 띄울건데
                fiveDogs.map(dog =>  // (4) map으로 각각의 요소에 대해서 아래 텍스트를 수행함 (익명함수!)
                    // data -> 5개 슬라이싱(fiveDogs) -> map에서 각각의 요소 1개(dog)
                    `
                    <div class="photo-item">
                        <img src="${dog.url}">
                        <p>강아지 ID: ${dog.id}</p>
                    </div>
                    `
                ) // .map()
            ) // .html()
        } // function
   ) // .done()

}

// 문제 3: 선택한 동물 사진 가져오기
function getSelectedAnimal() {
    const selected = $("#animalSelect").val();

    if (!selected) {
        $("#result3").html(
            '<div style="color: red;">동물을 선택해주세요!</div>'
        );
        return;
    }

    $("#result3").html(
        '<div class="loading">선택한 동물 사진을 가져오는 중...</div>'
    );

    // 여기에 코드 작성
    $.get(`https://api.the${selected}api.com/v1/images/search?limit=3`)
        .done(
            function(data) {
                const count = data.slice(0,5);
                $("#result3").html(
                    count.map(animal =>
                        `
                        <div class="photo-item">
                            <img src="${animal.url}"/>
                            <p>${selected} ID = ${animal.id}</p>
                        </div>
                        `
                    )
                )
            }
        )
    
    
    
    // if문을 사용해서 조건에 따라 다른 사진 표시
    
}

// 문제 4: 원하는 개수만큼 고양이 사진 가져오기
function getCatsWithCount() {
    const count = $("#photoCount").val();

    if (!count || count < 1 || count > 10) {
        $("#result4").html(
            '<div style="color: red;">1-10 사이의 숫자를 입력해주세요!</div>'
        );
        return;
    }

    $("#result4").html(
        '<div class="loading">고양이 사진을 가져오는 중...</div>'
    );

    // 여기에 코드 작성
    // count 개수만큼 고양이 사진 가져오기
    // Array.from({length: count}, (_, i) => ...) 패턴 사용
    // .join(""): 마지막에 ,(콤마)나 역따옴표가 설정되는 것을 빈 값("")으로 처리
    $.get("https://api.thecatapi.com/v1/images/search?limit=10")
    .done(
        function(data) {
            const countCat = data.slice(0, count);
            $("#result4").html(
                `<div class="photo-grid">
                ${
                countCat
                .map(
                    (cat) => 
                        `
                        <div class="photo-item">
                            <img src="${cat.url}">
                            <p>고양이 ID : ${cat.id}</p>
                        </div>  
                        `
                )
                .join("")}  
                </div>`
            );
        })
    .fail()
}

// 문제 5: 랜덤 동물 사진 갤러리
function getRandomGallery() {
    $("#result5").html(
        '<div class="loading">🎲 랜덤 동물 갤러리를 만드는 중...</div>'
    );

    // 여기에 코드 작성
    // 고양이 4장 + 강아지 4장 = 총 8장
    // 두 배열을 합쳐서 하나의 갤러리로 표시

    // 1. https://api.thecatapi.com/v1/images/search?limit=10

    // 2. https://api.thedogapi.com/v1/images/search?limit=10
    animal("cat");
    animal("dog");
}

function animal(동물이름){
    $.get(`https://api.the${동물이름}api.com/v1/images/search?limit=10`)
    .done(
        function(data){
            const count = data.slice(0,5);
            $("#result5").html(
                $("#result5").html() + count.map((i) => `<img src="${i.url}">`)
            );
        }
    );
}
