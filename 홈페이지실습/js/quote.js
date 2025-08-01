$(function () {
    $("#getQuote").click(getQuote);
});

function getQuote() {
    // https://api.quotable.io/random
    // 안전하지 않음 에서 고급 클릭 -> 사이트 이동

    // .get()
    // .done()
    /*
    <div class="success">
        <div class="quote-box">
            <h3> content </h3>
            <p> - author - </p>
        </div>
    </div>
    */
   
    $.get("https://api.quotable.io/random")
    .done(function (data) {
        $("#quoteResult").html(
            `
                <div class="success">
                    <div class="quote-box">
                        <br>
                        <h3> ${data.content} </h3>
                        <br>
                        <p> - ${data.author} - </p>
                        <br>
                    </div>
                </div>            
                `
        );
    });

}
