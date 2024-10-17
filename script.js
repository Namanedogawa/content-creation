let score = 0;

function createBubble(type = 'random') {
    const bubble = document.createElement('div');

    // Определяем тип пузырька: либо случайный, либо тот, который был нажат
    if (type === 'random') {
        const bubbleType = Math.random();
        if (bubbleType < 0.33) {
            bubble.classList.add('bubble', 'whale');
        } else if (bubbleType < 0.66) {
            bubble.classList.add('bubble', 'cypherpepe');
        } else {
            bubble.classList.add('bubble', 'lastking');
        }
    } else {
        bubble.classList.add('bubble', type);
    }

    // Случайное начальное положение пузырька
    bubble.style.top = `${Math.random() * 80}vh`;
    bubble.style.left = `${Math.random() * 80}vw`;

    document.querySelector('.bubble-container').appendChild(bubble);

    // Добавляем случайное направление и скорость (уменьшили еще в 1.5 раза)
    let deltaX = (Math.random() * 0.89 + 0.44) * (Math.random() > 0.5 ? 1 : -1); // Скорость уменьшена (от ~0.44 до ~1.33 пикселей на кадр)
    let deltaY = (Math.random() * 0.89 + 0.44) * (Math.random() > 0.5 ? 1 : -1);

    function moveBubble() {
        let bubbleRect = bubble.getBoundingClientRect();
        let containerRect = document.querySelector('.bubble-container').getBoundingClientRect();

        // Проверка столкновения с границами контейнера и отталкивание
        if (bubbleRect.left <= containerRect.left) {
            deltaX = Math.abs(deltaX); // Отталкивание вправо
        } else if (bubbleRect.right >= containerRect.right) {
            deltaX = -Math.abs(deltaX); // Отталкивание влево
        }

        if (bubbleRect.top <= containerRect.top) {
            deltaY = Math.abs(deltaY); // Отталкивание вниз
        } else if (bubbleRect.bottom >= containerRect.bottom) {
            deltaY = -Math.abs(deltaY); // Отталкивание вверх
        }

        // Обновляем положение пузырька
        bubble.style.left = `${bubble.offsetLeft + deltaX}px`;
        bubble.style.top = `${bubble.offsetTop + deltaY}px`;

        // Продолжаем движение, если пузырек не лопнул
        if (!bubble.classList.contains('pop')) {
            requestAnimationFrame(moveBubble);
        }
    }

    // Запуск анимации движения пузырька
    moveBubble();

    // Добавляем событие на клик для лопания пузырька
    bubble.addEventListener('click', () => {
        bubble.classList.add('pop');

        // Определяем тип пузырька и добавляем очки и звук
        if (bubble.classList.contains('whale')) {
            playSound('whale_pop.mp3');
            score += 1;
        } else if (bubble.classList.contains('cypherpepe')) {
            playSound('cypherpepe_pop.mp3');
            score += 5;
        } else if (bubble.classList.contains('lastking')) {
            playSound('lastking_pop.mp3');
            score += 5;
        }

        document.getElementById('score').textContent = score;

        setTimeout(() => {
            bubble.remove();
            createBubble(type); // Создаем новый пузырек того же типа после клика
        }, 300);
    });
}

// Запускаем создание пузырьков (по 20 каждого типа)
for (let i = 0; i < 20; i++) {
    createBubble('whale');
    createBubble('cypherpepe');
    createBubble('lastking');
}

// Функция для воспроизведения звука
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}
