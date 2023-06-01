const URL = " http://localhost:3000/games";
fetch(URL)
.then(resp=>resp.json())
.then(games=>{
    games.forEach(game=>renderGame(game))
    displayGameDetails(games[0])
})
.catch(e=>alert(e.message))
document.querySelector("#high-score-form").addEventListener("submit", updateHighScore)
let selectedGame;


function renderGame(game){
    //Game list is what we want to add all of the games in
    const gameList = document.querySelector(".game-list")
    const nameElement = document.createElement("h5")
    nameElement.textContent = game.name +"("+game.manufacturer_name+")"
    gameList.append(nameElement)
    nameElement.addEventListener("click", ()=>displayGameDetails(game))
}
function displayGameDetails(game){
    document.querySelector("#detail-image").src = game.image
    document.querySelector("#detail-title").textContent = game.name
    document.querySelector("#detail-high-score").textContent = game.high_score
    selectedGame = game;
}
function updateHighScore(event){
    event.preventDefault();
    const high_score = event.target["score-input"].value
    //PATCH
    const updateScore = {high_score}

    fetch(`${URL}/${selectedGame.id}`, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(updateScore)
    })
    .then(response=>response.json())
    .then(updatedGame=>{
        selectedGame = updatedGame
        document.querySelector("#detail-high-score").textContent = selectedGame.high_score
    })
    .catch(e=>alert(e.message))
    selectedGame.high_score = high_score
    document.querySelector("#detail-high-score").textContent = high_score
    event.target.reset()
}
