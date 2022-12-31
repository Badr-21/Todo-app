const input = document.querySelector('input');
const todoItems = document.querySelector('.todo-items')
const selections = Array.from(document.querySelectorAll('.selection p'));
const items = Array.from(document.querySelectorAll('.todo-item'));
const itemsActive = document.getElementsByClassName('todo-item active');
const itemsLeft = document.querySelector(".items-left");


const selectFilter = (selection) => {
    selections.forEach(selection => {
    selection.classList.remove('activated')
    })
    selection.classList.add('activated')
}

const itemFilter = (item) => {
    items.forEach(item => {
        item.style.display = 'none'
    })
    document.querySelectorAll(item.dataset.select).forEach(item => {
        item.style.display = "flex"
    })
}

const itemCount = () => {
    itemsLeft.innerText = itemsActive.length
}

const itemCompleted = (ele) => {
    if(ele.parentElement.classList.contains('completed')) {
        ele.parentElement.classList.remove('completed')
        ele.parentElement.classList.add('active')
    }else {
        ele.parentElement.classList.remove('active')
        ele.parentElement.classList.add('completed')
    }
}

const itemAdd = () => {
    const todoItem = document.createElement("div")
    todoItem.classList.add("todo-item", "all", "active")
    const icon = document.createElement("div")
    icon.classList.add("icon-completed")
    todoItem.appendChild(icon)
    const text = document.createElement("div")
    text.classList.add("text-item")
    text.append(input.value)
    todoItem.appendChild(text)
    const image = document.createElement("div")
    image.classList.add("image")
    const img = document.createElement("img")
    img.src= "images/icon-cross.svg"
    img.alt= "icon cross"
    image.appendChild(img)
    todoItem.appendChild(image)
    todoItems.prepend(todoItem)
    input.value= ""
    itemCount()
}

const itemDelete = (ele) => {
    ele.parentElement.parentElement.remove()
}

selections.forEach(selection => {
    selection.addEventListener('click', e => {
        selectFilter(e.target)
        itemFilter(e.target)
        itemCount()
    })
})

input.addEventListener('keypress', e => {
    if(input.value.length === 0) return
    if(e.key === 'Enter') {
        itemAdd()
    }
})

document.addEventListener('click', e => {
    if(e.target.classList.contains("icon-completed")) {
        itemCompleted(e.target)
        itemCount()
    }
})

document.addEventListener('click', e => {
    if(e.target.parentElement.classList.contains("image")) {
        itemDelete(e.target)
        itemCount()
    }
})