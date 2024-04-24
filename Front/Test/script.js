let studentsListContainer = document.querySelector('.students')

async function handleSearch() {
    studentsListContainer.innerHTML = ''
    let studentName = document.querySelector('.studentName').value

    let query = {
        name: studentName,
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(query),
    }

    let apiRequest = fetch('http://localhost:3000/api/students/search', request)
    let reponse = await apiRequest
    let students = await reponse.json()
    console.log(students)
    students.forEach((element) => {
        studentsListContainer.innerHTML += `<div class=" h-48 w-1/3 bg-black text-white rounded-md m-6"><p>${element.student_name}</p> <p>${element.training_center_name}</p> <p>${element.training_name}</p></div>`
    })
}
