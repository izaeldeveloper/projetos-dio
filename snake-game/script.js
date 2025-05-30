let placar = document.getElementById('placar')
let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let pontos = 0

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let food = {
    x: Math.floor(Math.random() * 15 * 1) * box,
    y: Math.floor(Math.random() * 15 * 1) * box
}

let direction = 'right'


function criarBG() {
    context.fillStyle = 'lightgreen'
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function snakeCreate(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = 'green'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function foodCreate(){
    context.fillStyle = 'red'
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update)

function update(e){

    if(e.keyCode == 37 && direction != 'right') direction = 'left'
    if(e.keyCode == 38 && direction != 'up') direction = 'down'
    if(e.keyCode == 39 && direction != 'left') direction = 'right'
    if(e.keyCode == 40 && direction != 'down') direction = 'up'


}


function initGame(){


    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
    if(snake[0].y > 15 * box && direction == 'up') snake[0].y = 0
    if(snake[0].y < 0 && direction == 'down') snake[0].y = 16 * box

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game)
            alert("Perdeu safado!")
        }
    }

    placar.innerHTML = `<p>Sua Pontuação: ${pontos}</p>`
    criarBG()
    snakeCreate()
    foodCreate()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == 'right') snakeX += box
    if(direction == 'left') snakeX -= box
    if(direction == 'up') snakeY += box
    if(direction == 'down') snakeY -= box

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        pontos += 1
        food.x = Math.floor(Math.random() * 15 * 1) * box
        food.y = Math.floor(Math.random() * 15 * 1) * box
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}

let game = setInterval(initGame, 100);

