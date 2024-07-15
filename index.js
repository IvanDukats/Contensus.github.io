// Функция для обработки нажатия на кнопку Poll
function onPollButtonClick() {
    // Создаем новую ссылку (элемент 'a')
    var newPageLink = document.createElement('a');

    // Устанавливаем атрибут href для новой ссылки
    newPageLink.href = 'poll.html';

    // Добавляем созданную ссылку в тело документа
    document.body.appendChild(newPageLink);

    // Нажимаем на ссылку (переход на новую страницу)
    newPageLink.click();
}

// Функция для обработки нажатия на кнопку Information
function onButtonInfoClick() {
    var newPageInfoLink = document.createElement('a');

    newPageInfoLink.href = 'newPage_info.html';

    document.body.appendChild(newPageInfoLink);

    newPageInfoLink.click();
}

// Добавляем обработчики событий для кнопок
document.getElementById('poll_button').addEventListener('click', onPollButtonClick);
document.getElementById('button_info').addEventListener('click', onButtonInfoClick);
