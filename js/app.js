//console.log('Enlazado a JS')
const theFirstForm = document.getElementById('theFirstForm')
const taskList = document.getElementById('taskList')
const theTemplate = document.getElementById('theTemplate').content
const fragment = document.createDocumentFragment()

let tareas = {}

document.addEventListener('DOMContentLoaded',()=>{
    //console.log(theFirstForm,taskList,theTemplate)
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

theFirstForm.addEventListener('submit',e => {
    e.preventDefault()
    console.log('event: ',e)
    setTarea(e)
})

const setTarea = e => {
    const texto=e.target.querySelector('input').value
    console.log('texto: ',texto)
    if(texto.trim() === ''){
        console.log('Void String')
        return
    }
    const tarea = {
        id: Date.now(),
        texto,
        estado: false
    }
    tareas[tarea.id] = tarea
    pintarTareas()
    theFirstForm.reset()
    e.target.querySelector('input').focus()
}

const pintarTareas = () => {
    localStorage.setItem('tareas',JSON.stringify(tareas))
    if(Object.values(tareas).length === 0){
        taskList.innerHTML = 
        `
        <div class="mt-2" id="taskList">
            <div class="alert alert-dark">
                Sin Tareas Pendientes 🐺
            </div>
        </div>
        `
        return
    }
    taskList.innerHTML = '' 
    Object.values(tareas).forEach(tarea => {
        //console.log('tarea',tareaHola)
        const clone = theTemplate.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto
        if( tarea.estado ){
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning','alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    taskList.appendChild(fragment)
}