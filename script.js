// const { get } = require("node:http")

const socket = io('http://localhost:3000')
const messageInput = document.getElementById('message-input')
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const chatHeader = document.getElementById('chat-header')

//to ask for the name and store it inside the chat

const name = prompt('What is your name ?')
appendMessage('You joined')
socket.emit('new-user', name )

socket.on('chat-message', data => {
  chatHeader.innerText = data.name
  appendMessage(`${data.message}`)
})

socket.on('user-connected', name => {
  chatHeader.innerText = name
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  chatHeader.innerText = 'Chat'
  appendMessage(`${name} disconnected`)
})
//don't let the browser reload after submitting message 
messageForm.addEventListener('submit',e =>{
    e.preventDefault()
   const message = messageInput.value
   appendMessage(message, 'mine')
//    and then clear the input 
   socket.emit('send-chat-message',message)
   messageInput.value=''
})

function appendMessage(message, type) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  if (type) messageElement.classList.add(type)
  messageContainer.append(messageElement)
}