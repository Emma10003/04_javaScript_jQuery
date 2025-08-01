// https://www.thecocktaildb.com/api/json/v1/1/random.php

$(function () {
    $("#cocktailBtn").click(showInfo);
});

function showInfo() {
    $("#contentsResult").html(
        `<div class="loadingMessage">오늘과 어울리는 칵테일을 찾는 중...🍸</div>`
    );

    $.get("https://www.thecocktaildb.com/api/json/v1/1/random.php").done(
        function (data) {
            const drink = data.drinks[0];
            $("#contentsResult").html(
                `
                    <img src="${data.drinks[0].strDrinkThumb}">
                    <div class="info">
                        <p><strong>칵테일: </strong>${drink.strDrink}</p>
                        <p><strong>알코올: </strong>${drink.strAlcoholic}</p>
                        <p><strong>칵테일 잔 타입: </strong>${drink.strGlass}</p>
                        <p><strong>설명 </strong><br>${drink.strInstructions}</p>
                    </div>
                `
            );
        }
    );
}
