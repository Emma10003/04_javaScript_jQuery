// https://www.thecocktaildb.com/api/json/v1/1/random.php

$(function () {
    // showInfo();
    $("#cocktailBtn").click(showInfo);
});

function showInfo() {
    $.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .done(function (data) {
            $("#contentsResult").html(
                `
                <div class="info">
                    <p>${data.drink[0].strDrink}</p>      // 칵테일 이름
                    <p>${data.drink[0].strAlcoholic}</p>  // 알코올 있는지 여부
                    <p>${data.drink[0].strGlass}</p>      // 어떤 잔에 담는지
                </div>
                `
            );
        })
        .fail();
}
