function finish(num: number) {
    
    state = 3
    basic.clearScreen()
    if (num == 0) {
        basic.showString("LOSE")
    } else {
        basic.showString("WIN")
    }
    
    basic.showString("SCORE")
    basic.showNumber(score)
    init()
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (state == 2) {
        if (direction == 0) {
            direction = 3
        } else if (direction == 1) {
            direction = 0
        } else if (direction == 2) {
            direction = 1
        } else if (direction == 3) {
            direction = 2
        }
        
    }
    
})
function init() {
    
    basic.showLeds(`
        . . . . .
                # # . . .
                . # . . .
                . # . . #
                . # # # #
    `)
    foodX = -1
    foodY = -1
    direction = 0
    snake_length = 1
    show = 5 - level
    score = 0
    level = 0
    for (let index = 0; index < 10; index++) {
        snakeX[index] = -1
        snakeY[index] = -1
    }
    state = 0
}

input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (state == 0) {
        snakeX[0] = 0
        snakeY[0] = 0
        led.plot(snakeX[0], snakeY[0])
        basic.clearScreen()
        state = 1
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (state == 2) {
        if (direction == 0) {
            direction = 1
        } else if (direction == 1) {
            direction = 2
        } else if (direction == 2) {
            direction = 3
        } else if (direction == 3) {
            direction = 0
        }
        
    }
    
})
function gen_food() {
    
    while (true) {
        foodX = randint(0, 4)
        foodY = randint(0, 4)
        if (led.point(foodX, foodY) == false) {
            break
        }
        
    }
}

function show_snake() {
    let index2: number;
    led.unplot(snakeX[snake_length - 1], snakeY[snake_length - 1])
    if (snake_length > 1) {
        index2 = 0
        while (index2 <= snake_length - 2) {
            snakeX[snake_length - 1 - index2] = snakeX[snake_length - 2 - index2]
            snakeY[snake_length - 1 - index2] = snakeY[snake_length - 2 - index2]
            index2 += 1
        }
    }
    
    if (direction == 0 && snakeX[0] < 4) {
        snakeX[0] = snakeX[0] + 1
    } else if (direction == 1 && snakeY[0] < 4) {
        snakeY[0] = snakeY[0] + 1
    } else if (direction == 2 && snakeX[0] > 0) {
        snakeX[0] = snakeX[0] - 1
    } else if (direction == 3 && snakeY[0] > 0) {
        snakeY[0] = snakeY[0] - 1
    } else {
        finish(0)
    }
    
    if (state == 2) {
        eat_food()
        led.plot(snakeX[0], snakeY[0])
    }
    
}

function eat_food() {
    
    if (snakeX[0] == foodX && snakeY[0] == foodY) {
        if (snake_length >= 10) {
            snake_length = 1
            level += 1
            for (let index3 = 0; index3 < 3; index3++) {
                basic.showLeds(`
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                `)
                basic.pause(200)
                basic.clearScreen()
                basic.pause(200)
            }
            if (level >= 5) {
                finish(1)
            } else {
                for (let index4 = 0; index4 < 10; index4++) {
                    snakeX[index4] = -1
                    snakeY[index4] = -1
                }
                snakeX[0] = 0
                snakeY[0] = 0
                led.plot(snakeX[0], snakeY[0])
                direction = 0
                state = 1
            }
            
        } else {
            snake_length += 1
            score += 1
            state = 1
        }
        
    } else if (led.point(snakeX[0], snakeY[0]) == true) {
        finish(0)
    }
    
}

let level = 0
let show = 0
let snake_length = 0
let foodY = 0
let foodX = 0
let direction = 0
let score = 0
let state = 0
let snakeY : number[] = []
let snakeX : number[] = []
snakeX = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
snakeY = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
init()
basic.forever(function on_forever() {
    
    if (state == 1) {
        gen_food()
        state = 2
    } else if (state == 2) {
        led.toggle(foodX, foodY)
        if (show == 0) {
            show = 5 - level
            show_snake()
        } else {
            show += -1
        }
        
    } else {
        
    }
    
    basic.pause(100)
})
