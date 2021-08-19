var hiscore = JSON.parse(localStorage.getItem("hiscore")) || [];
var clearButtonEl = document.querySelector(".clear-btn");

var displayScores = function(){
    //sorts array in order
    hiscore.sort(function(a,b){
        return b.score-a.score;
    });

    var olEl=document.querySelector(".hiscore-table");

    hiscore.forEach(score => {
        var liEl = document.createElement("li");
        liEl.textContent= score.player +" - "+score.score;
        
        olEl.appendChild(liEl);
    });
}

//clear button
var clearButtonFunc = function(){
    localStorage.clear();
    window.location.reload();
}

//event listener for clear button
clearButtonEl.addEventListener("click", clearButtonFunc);

//run display scores on page load
displayScores();
