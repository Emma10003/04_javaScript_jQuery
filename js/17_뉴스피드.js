const URL = "../json/news.json"

$(function () {
    뉴스불러오기(); // 클릭하지 않아도 뉴스목록이 뜸
    $("#loadBtn").click(뉴스검색하기);


});

// select value 값에 적당한 데이터만 선택해서 검색하기 설정
// 과제) input && category -> 검색이 일치하는 데이터만 조회하기

function 뉴스불러오기() {
    $.get(URL).done(function (data) {
        $("#newsContainer").html(
            data.map(
                (i) =>
                    `
                    <div class="news-card">
                        <div class="news-title">${i.title}</div>
                        <div class="news-content">${i.content}</div>
                    </div>
                    `
            )
        );
    }); // .done()
}

function 뉴스검색하기() {
    const selection = $("#categoryFilter").val(); // html 문서 상에서 option들의 value값
                                                  // id가 categoryFilter인 애들이니까 #option이 아니라 #categoryFilter
    console.log("selection : ", selection);
    $.get(URL)
        .done(function (data) {
            $("#newsContainer").html(
                data
                    .filter((category) => category.category == selection)
                    .map(
                        (category) =>
                            `
                    <div class="news-card">
                        <div class="news-title">${category.title}</div>
                        <div class="news-content">${category.content}</div>
                    </div>
                    `
                    )
            );
        })
        .fail();
}
