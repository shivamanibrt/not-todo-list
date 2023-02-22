// get form data on form submit
// store data in a global array
// create a display function to display all the data from array to entry list

let taskList = []
let badList = []
const invalidChars = ["+", "-", "e", "E"]

const hrsPerWeek = 24 * 7

const q = document.querySelector(".hrs-input")

q.addEventListener("keydown", (e) => {
  invalidChars.includes(e.key) && e.preventDefault()
})

document.getElementById("form-btn").addEventListener("click", (e) => {
  e.preventDefault()

  const task = document.querySelector(".task-input").value
  const hr = q.value
  if (!task || !hr) return
  const obj = {
    task,
    hr,
  }

  const totalAllocatedHrs = totalTaskHours()
  if (totalAllocatedHrs + +hr > hrsPerWeek) {
    return alert(
      "Sorry, you do not have enough time to add more tasks this week!"
    )
  }
  taskList.push(obj)
  displayTasks()
  totalTaskHours()
})

const displayTasks = () => {
  let str = ""
  taskList.map((item, i) => {
    str += `
        <tr>
        <td>${i + 1}</td>
        <td>${item.task}</td>
        <td>${item.hr} hr(s)</td>
        <td class="text-end">
        <button onclick="deleteTask(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        <button onclick="markAsNotToDo(${i})" class="btn btn-success"><i class="fa-solid fa-right-long"></i></button>
        </td>
        </tr>
    `
  })
  document.querySelector("#task-list").innerHTML = str
}

const displayBadTasks = () => {
  let str = ""
  badList.map((item, i) => {
    str += `
          <tr>
          <td>${i + 1}</td>
          <td>${item.task}</td>
          <td>${item.hr} hr(s)</td>
          <td class="text-end">
          <button onclick="deleteBadTask(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
          <button onclick="markAsToDo(${i})" class="btn btn-warning"><i class="fa-solid fa-left-long"></i></button>
          </td>
          </tr>
      `
  })
  document.querySelector("#bad-task").innerHTML = str

  totalBadTaskHours()
}
const markAsNotToDo = (i) => {
  const item = taskList.splice(i, 1)
  badList.push(item[0])
  displayTasks()
  displayBadTasks()
}
const markAsToDo = (i) => {
  const item = badList.splice(i, 1)
  taskList.push(item[0])
  displayTasks()
  displayBadTasks()
}
const deleteTask = (i) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    taskList = taskList.filter((item, index) => index !== i)
    displayTasks()
    totalTaskHours()
  }
}
const deleteBadTask = (i) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    badList = badList.filter((item, index) => index !== i)
    displayBadTasks()
  }
}

const totalBadTaskHours = () => {
  const total = badList.reduce((a, i) => a + +i.hr, 0)
  document.querySelector("#totalBadHrs").innerText = total
  return total
}

const totalTaskHours = () => {
  const total = taskList.reduce((a, i) => a + +i.hr, 0)
  document.querySelector("#totalHrs").innerText = total + totalBadTaskHours()
  return total
}
