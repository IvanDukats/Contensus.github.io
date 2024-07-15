function getQueryParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const queryArray = queryString.split('&');

  queryArray.forEach(query => {
      const pair = query.split('=');
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  });

  return params;
}

// Получаем текст из параметров URL
const queryParams = getQueryParams();
const sessionId = queryParams['sessionId'] || '';

function fetchMessages() {
  fetch(`http://localhost:3000/getMessages?sessionId=${sessionId}`)
      .then(response => response.json())
      .then(data => {
          const displayTextElement = document.getElementById('displayText');
          displayTextElement.innerHTML = ''; // Очистка предыдущих сообщений
          data.messages.forEach((element, index) => {
              const messageDiv = document.createElement('div');
              messageDiv.style.border = '1px solid black';
              messageDiv.style.padding = '10px';
              messageDiv.style.margin = '5px auto';
              messageDiv.style.width = '300px';
              messageDiv.style.display = 'flex'; // Установка flexbox

              const messageText = document.createElement('span');
              messageText.textContent = element.message;
              messageDiv.appendChild(messageText);

              const likeButton = document.createElement('button');
              const likedMessages = JSON.parse(localStorage.getItem('likedMessages')) || [];
              const isLiked = likedMessages.includes(`${sessionId}-${index}`);
              likeButton.textContent = `Like (${element.likes})`;
              if (isLiked) {
                  likeButton.classList.add('liked'); // Добавляем класс для стилизации
              }

              likeButton.style.marginLeft = 'auto'; // Размещаем кнопку справа
              likeButton.addEventListener('click', () => {
                  const likedMessages = JSON.parse(localStorage.getItem('likedMessages')) || [];
                  const messageKey = `${sessionId}-${index}`;
                  if (likedMessages.includes(messageKey)) {
                      // Если уже лайкнуто, убираем лайк
                      fetch('http://localhost:3000/unlikeMessage', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ sessionId, messageIndex: index })
                      })
                      .then(response => response.json())
                      .then(() => {
                          element.likes -= 1;
                          likeButton.textContent = `Like (${element.likes})`;
                          const updatedLikedMessages = likedMessages.filter(msg => msg !== messageKey);
                          localStorage.setItem('likedMessages', JSON.stringify(updatedLikedMessages));
                          likeButton.classList.remove('liked'); // Убираем класс стилизации
                      })
                      .catch(error => {
                          console.error('Error:', error);
                      });
                  } else {
                      // Если еще не лайкнуто, добавляем лайк
                      fetch('http://localhost:3000/likeMessage', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ sessionId, messageIndex: index })
                      })
                      .then(response => response.json())
                      .then(() => {
                          element.likes += 1;
                          likeButton.textContent = `Like (${element.likes})`;
                          likedMessages.push(messageKey);
                          localStorage.setItem('likedMessages', JSON.stringify(likedMessages));
                          likeButton.classList.add('liked'); // Добавляем класс стилизации
                      })
                      .catch(error => {
                          console.error('Error:', error);
                      });
                  }
              });

              messageDiv.appendChild(likeButton);
              displayTextElement.appendChild(messageDiv);
          });
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

// Отправка нового сообщения и обновление списка сообщений
function onSubmitButtonClick() {
  const userInput2 = document.getElementById('userInput').value;

  fetch('http://localhost:3000/addMessage', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId, message: userInput2 })
  })
  .then(response => response.json())
  .then(() => {
      fetchMessages(); // Обновление списка сообщений
      document.getElementById('userInput').value = ''; // Очистка поля ввода
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

// Добавляем обработчик события для кнопки "Submit"
document.getElementById('submitButton').addEventListener('click', onSubmitButtonClick);

// Также добавляем обработчик события для нажатия Enter
document.getElementById('userInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      onSubmitButtonClick();
  }
});

// Загрузка сообщений при загрузке страницы
fetchMessages();

// Функция для обработки нажатия на кнопку "Home Page"
function onHomeButtonClick() {
  var newHomePageLink = document.createElement('a');
  newHomePageLink.href = 'index.html';
  document.body.appendChild(newHomePageLink);
  newHomePageLink.click();
}

// Добавляем обработчик события для кнопки "Home Page"
document.getElementById('homeButton').addEventListener('click', onHomeButtonClick);
