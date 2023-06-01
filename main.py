def finish(num: number):
    global state
    state = 3
    basic.clear_screen()
    if num == 0:
        basic.show_string("LOSE")
    else:
        basic.show_string("WIN")
    basic.show_string("SCORE")
    basic.show_number(score)
    init()

def on_button_pressed_a():
    global direction
    if state == 2:
        if direction == 0:
            direction = 3
        elif direction == 1:
            direction = 0
        elif direction == 2:
            direction = 1
        elif direction == 3:
            direction = 2
input.on_button_pressed(Button.A, on_button_pressed_a)

def init():
    global foodX, foodY, direction, snake_length, show, score, level, state
    basic.show_leds("""
        . . . . .
                # # . . .
                . # . . .
                . # . . #
                . # # # #
    """)
    foodX = -1
    foodY = -1
    direction = 0
    snake_length = 1
    show = 5 - level
    score = 0
    level = 0
    for index in range(10):
        snakeX[index] = -1
        snakeY[index] = -1
    state = 0

def on_button_pressed_ab():
    global state
    if state == 0:
        snakeX[0] = 0
        snakeY[0] = 0
        led.plot(snakeX[0], snakeY[0])
        basic.clear_screen()
        state = 1
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global direction
    if state == 2:
        if direction == 0:
            direction = 1
        elif direction == 1:
            direction = 2
        elif direction == 2:
            direction = 3
        elif direction == 3:
            direction = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def gen_food():
    global foodX, foodY
    while True:
        foodX = randint(0, 4)
        foodY = randint(0, 4)
        if led.point(foodX, foodY) == False:
            break
def show_snake():
    led.unplot(snakeX[snake_length - 1], snakeY[snake_length - 1])
    if snake_length > 1:
        index2 = 0
        while index2 <= snake_length - 2:
            snakeX[snake_length - 1 - index2] = snakeX[snake_length - 2 - index2]
            snakeY[snake_length - 1 - index2] = snakeY[snake_length - 2 - index2]
            index2 += 1
    if direction == 0 and snakeX[0] < 4:
        snakeX[0] = snakeX[0] + 1
    elif direction == 1 and snakeY[0] < 4:
        snakeY[0] = snakeY[0] + 1
    elif direction == 2 and snakeX[0] > 0:
        snakeX[0] = snakeX[0] - 1
    elif direction == 3 and snakeY[0] > 0:
        snakeY[0] = snakeY[0] - 1
    else:
        finish(0)
    if state == 2:
        eat_food()
        led.plot(snakeX[0], snakeY[0])
def eat_food():
    global snake_length, level, direction, state, score
    if snakeX[0] == foodX and snakeY[0] == foodY:
        if snake_length >= 10:
            snake_length = 1
            level += 1
            for index3 in range(3):
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                """)
                basic.pause(200)
                basic.clear_screen()
                basic.pause(200)
            if level >= 5:
                finish(1)
            else:
                for index4 in range(10):
                    snakeX[index4] = -1
                    snakeY[index4] = -1
                snakeX[0] = 0
                snakeY[0] = 0
                led.plot(snakeX[0], snakeY[0])
                direction = 0
                state = 1
        else:
            snake_length += 1
            score += 1
            state = 1
    elif led.point(snakeX[0], snakeY[0]) == True:
        finish(0)
level = 0
show = 0
snake_length = 0
foodY = 0
foodX = 0
direction = 0
score = 0
state = 0
snakeY: List[number] = []
snakeX: List[number] = []
snakeX = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
snakeY = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
init()

def on_forever():
    global state, show
    if state == 1:
        gen_food()
        state = 2
    elif state == 2:
        led.toggle(foodX, foodY)
        if show == 0:
            show = 5 - level
            show_snake()
        else:
            show += -1
    else:
        pass
    basic.pause(100)
basic.forever(on_forever)
