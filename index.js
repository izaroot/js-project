let mainDiv = document.querySelector('#main-display') 
let cardCollectionDiv = document.querySelector('#card-collection')
let displayGame = {}

let displayTitleH1 = document.querySelector('#main-display h1')
let displayImage = document.querySelector('#main-display img')
let displayGenreP = document.querySelector('#genre')
let displayYearP = document.querySelector('#year')
let displayLikesP = document.querySelector('#likes')
let displayPlatformDiv = document.querySelector('#platform')

let likeButton = document.querySelector('#main-display button')

fetch('http://localhost:3000/games')
.then(resp => resp.json())
.then((gamesArr) => {
    gamesArr.forEach(gameObj => {
        let cardDiv = document.createElement('div')
        cardDiv.className= "card"

        let gameImage = document.createElement('img')
        gameImage.src = gameObj.image

        let titleH3 = document.createElement('h3')
        titleH3.innerText = gameObj.title

        let genreP = document.createElement('p')
        genreP.innerText = `Genre: ${gameObj.genre}`

        cardDiv.append(gameImage, titleH3, genreP)
        cardCollectionDiv.append(cardDiv)

        switch(true){

            case gameObj.platform.PC: console.log(gameObj.platform.PC)
            case gameObj.platform.xbox: console.log(gameObj.platform.xbox)
            case gameObj.platform.PS: console.log(gameObj.platform.PS)
            case gameObj.platform.switch: console.log(gameObj.platform.switch)
            break;
            default: console.log("nothinggggg")
        }


        cardDiv.addEventListener('click', (e) => {
            displayGame = gameObj

            console.log(gameObj)

            displayTitleH1.innerText = gameObj.title
            displayImage.src = gameObj.image
            displayGenreP.innerText = gameObj.genre
            displayYearP.innerText = gameObj.year
            displayLikesP.innerText = gameObj.likes


            

        })

        likeButton.addEventListener('click', (e) => {

            fetch(`http://localhost:3000/games/${gameObj.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                   likes: gameObj.likes + 1 
                })
            })
            .then(resp => resp.json())
            .then(updatedGameObj => {
                gameObj = updatedGameObj
                displayLikesP.innerText = updatedGameObj.likes
            
            })
            
            //likeButton.disabled=true 
            
            })


    } )
})


fetch("http://localhost:3000/games/1")
.then(resp => resp.json())
.then(gameObj => {
    displayGame = gameObj

            displayTitleH1.innerText = gameObj.title
            displayImage.src = gameObj.image
            displayGenreP.innerText = gameObj.genre
            displayYearP.innerText = gameObj.year
            displayLikesP.innerText = gameObj.likes
})


// likeButton.addEventListener('click', (e) => {

// fetch(`http://localhost:3000/games/${displayGame.id}`, {
//     method: "PATCH",
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//     },
//     body: JSON.stringify({
//        likes: displayGame.likes + 1 
//     })
// })
// .then(resp => resp.json())
// .then(updatedGameObj => {
//     displayGame = updatedGameObj
//     displayLikesP.innerText = updatedGameObj.likes

// })

// likeButton.disabled=true 

// })



{/* <div class="card">
    <img src="https://image.api.playstation.com/cdn/UP0006/CUSA10866_00/3uebKTl6KgC0chEhBOs3GVaOLapwPgQ5.png">
    <p>Burnout Paradise Remastered</p>
    <p>Genre: Racing</p>
    <div id="platforms">
        <img src="https://cdn.icon-icons.com/icons2/688/PNG/512/windows-software-operating-system_icon-icons.com_61426.png">
    </div>
</div> */}