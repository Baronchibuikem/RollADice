var score, round_score, active_player

let game_playing = "True"
console.log(game_playing)


// When the UI first loads, this function is what gets called
let init_state = () => {
    score = [0, 0]
    round_score = 0
    active_player = 0

    // This ensures the dice image is not shown on first load
    document.querySelector('.dice').style.display = "none"

    // This is used to get the id in our html code
    document.getElementById('score-0').textContent = "0"
    document.getElementById('score-1').textContent = "0"
    document.getElementById('current-0').textContent = "0"
    document.getElementById('current-1').textContent = "0"
    document.getElementById('name-0').textContent = "Player 1"
    document.getElementById('name-1').textContent = "Player 2"

    // This removes the applied css class of winner on both players
    document.querySelector('.player-0-panel').classList.remove("winner");
    document.querySelector('.player-1-panel').classList.remove("winner");

    // This removes the applied active class on the players
    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-1-panel').classList.remove("active");

    // This adds active class on player 1
    document.querySelector('.player-0-panel').classList.add("active");


}


// Initial state of the page when it is loaded
init_state()



// This is used to make changes to our UI when the roll dice button is clicked
document.querySelector(".btn-roll").addEventListener('click', btn_roll_dice = () => {
    if (game_playing) {
        // 1. Random number
        let dice = Math.floor(Math.random() * 6) + 1

        // Display the result
        const diceDom = document.querySelector('.dice')
        diceDom.style.display = 'block'
        diceDom.src = `images/dice-${dice}.png`

        // Update the round
        if (dice !== 1) {
            // Add the dice number to the round_score
            round_score += dice
            // update the UI to reflect the added score of the current player
            document.querySelector(`#current-${active_player}`).textContent = round_score

        } else {
            // if dice is 1, then the next player gets to play
            next_player()
        }

    }

})



// This is used to make changes to our UI when the hold button is clicked
document.querySelector('.btn-hold').addEventListener('click', btn_hold_dice = () => {
    // if the game is still being played
    if (game_playing) {
        // Add the round_score and the score of the active user
        score[active_player] += round_score

        // Update the UI to reflect the changes in score
        document.querySelector(`#score-${active_player}`).textContent = score[active_player]

        // Check if player won the game
        // if the score for the active player is above or equal to 100
        if (score[active_player] >= 100) {
            // We update the UI of the active player to display Winner
            document.querySelector(`#name-${active_player}`).textContent = "Winner"
            // we hide the dice image
            document.querySelector(".dice").style.display = "none"
            // We add styling of class winner which was defined in our style.css to the active winner
            document.querySelector(`.player-${active_player}-panel`).classList.add("winner");
            // we remove the active class from the active user
            document.querySelector(`.player-${active_player}-panel`).classList.remove("active");
            // we disable the game
            game_playing = false
        } else {
            // else if score is not upto or above 100, the next player plays his/her turn
            next_player()
        }
    }


})


// This is used to refresh the game and set everything to default value when the new game button is clicked
document.querySelector(".btn-new").addEventListener('click', init_state)

let next_player = () => {
    // Next player
    // if active_player is zero, then change active_player to one else
    // change active player to zero
    active_player === 0 ? active_player = 1 : active_player = 0;
    // Reset the round_score to zero upon change in player
    round_score = 0;
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = '0';

    // This is used to set change the active class
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    // This is used to hide the dice images when the player is switched
    document.querySelector('.dice').style.display = 'none'
}