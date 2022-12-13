const submit = document.querySelector(".submit");
const geo = document.querySelector(".location");
const chat = document.querySelector(".show-chat");

let websocket = new WebSocket("wss://echo-ws-service.herokuapp.com");
function load() {
  websocket.onopen = function () {
    chat.innerHTML = `Cоединение установлено<br> Можете отправлять сообщение`;
  };
  websocket.onclose = function (event) {
    if (event.wasClean) {
      chat.innerHTML = "Cоединение закрыто";
    } else {
      chat.innerHTML = "Cоединения как-то закрыто";
    }
    chat.innerHTML +=
      "<br>код: " +
      event.code +
      "<br> Обновите страницу";
  };
  websocket.onmessage = function (evt) {
    if (evt.data.indexOf('https://www.openstreetmap.org/#map=18') === -1)
    showMessage('<span class = "server">Сервер: </span><br>' + evt.data);
  };
  websocket.onerror = function (evt) {
    showMessage('<span style="color: red;">ERROR:</span> ' + evt.data);
  };
}

function showMessage(message) {
  let block = document.createElement("p");
  block.classList.add("block-message");
  block.innerHTML = message;
  chat.appendChild(block);
}

submit.addEventListener("click", () => {
  let inputMessage = document.querySelector(".input-message");
    if (!inputMessage.value) {
      let block = document.createElement("div");
      block.innerHTML = `<span style = "color: red">Вы ничего не ввели</span>`;
      chat.append(block);
    }
    else {
      showMessage('<span class = "client">Клиент: </span><br>' + inputMessage.value);
    websocket.send(inputMessage.value);
    inputMessage.value = '';
    }
});

const error = () => {
  const blockGeo = document.createElement("span");
  blockGeo.classList.add("block-geo");
  blockGeo.innerHTML = 'Невозможно получить ваше местоположение';
  chat.appendChild(blockGeo);
}

const success = (position) => {
  const link = document.createElement("a");
  link.classList.add("link-geo");
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  link.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  link.textContent = 'Геолокация';
  chat.appendChild(link);
  websocket.send(link.href);
}

geo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    chat.appendChild('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
document.addEventListener("DOMContentLoaded", load());