// Функция для обработки нажатия на кнопку "Submit"
function onSubmitButtonClick() {
  const userInput = document.getElementById('userInput').value;

  fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInput })
  })
  .then(response => response.json())
  .then(data => {
      console.log('Message sent successfully:', data);
      window.location.href = `newResult.html?sessionId=${data.sessionId}`;
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
// Функция для обработки нажатия на кнопку "Home Page"
function onHomeButtonClick() {
  var newHomePageLink = document.createElement('a');
  newHomePageLink.href = 'index.html';
  document.body.appendChild(newHomePageLink);
  newHomePageLink.click();
}

// Добавляем обработчик события для кнопки "Home Page"
document.getElementById('homeButton').addEventListener('click', onHomeButtonClick);

