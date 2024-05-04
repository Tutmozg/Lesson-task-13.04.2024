const req1 = document.querySelector('.btn1')
const req2 = document.querySelector('.productsBtn')
const req3 = document.querySelector('.btn2')
const req4 = document.querySelector('.salaryBtn')
const container1 = document.querySelector('.Products-container')
const container2 = document.querySelector('.Salary-container')
//! GET
const getData = url => {
    return new Promise((resolve, reject) =>
        fetch(url)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
    )
}

//! POST
const postData = (url, data) => {
    return new Promise((resolve, reject) =>
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
    )
}

//! DELETE
const deleteData = url => {
    return new Promise((resolve, reject) =>
        fetch(`${url}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    resolve('Данные успешно удалены')
                } else {
                    reject('Ошибка удаления данных')
                }
            })
            .catch(error => reject(error))
    )
}

//! PATCH
const patchData = (url, updatedData) => {
    return new Promise((resolve, reject) =>
        fetch(`${url}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedData),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
    )
}

req1.addEventListener('click', async () => {
    try {
        if (container1.innerHTML != '') {
            container1.innerHTML = ''
        }
        const users = await getData('https://lesson-task-13-04-2024.onrender.com/getUsers')
        users.users.forEach(el => {
            container1.insertAdjacentHTML('beforeend', `
            <div class="product">
                <div class="name">name: ${el.name}</div>
                <div class="price">price: ${el.price}</div>
            </div>
            `)
        });
    } catch (err) {
        console.error('Произошла ошибка при получении пользователей', err)
    }
})

req2.addEventListener('click', async () => {
    if (container1.innerHTML != '') {
        container1.innerHTML = ''
    }
    let name = prompt('Введите название')
    let salary = prompt('Введите скидку')
    let price = prompt('Введите цену')
    try {
        let user = {
            name,
            price,
            salary
        }
        console.log(user)
        let info = await postData('https://lesson-task-13-04-2024.onrender.com/addUser', user)
        const users = await getData('https://lesson-task-13-04-2024.onrender.com/getUsers')
        users.users.forEach(el => {
            container1.insertAdjacentHTML('beforeend', `
            <div class="product">
                <div class="name">name: ${el.name}</div>
                <div class="price">price: ${el.price}</div>
            </div>
            `)
        });
    } catch (err) {
        console.error('Произошла ошибка при добавлении нового пользователя', err)
    }
})

req3.addEventListener('click', async () => {
    try {
        if (container2.innerHTML != '') {
            container2.innerHTML = ''
        }
        const users = await getData('https://lesson-task-13-04-2024.onrender.com/getUsers')
        users.users.forEach(el => {
            if (el.salary != null) {
                container2.insertAdjacentHTML('beforeend', `
                <div class="product-salary">
                    <div class="name">name: ${el.name}</div>
                    <div class="price">price: </div>
                    <div class="real-price">${el.price} =></div>
                    <div class="block"></div>
                    <div class="not-real-price">${el.price - el.price * el.salary}</div>
                </div>
            `)
            }
        });
    } catch (err) {
        console.error('Произошла ошибка при удалении пользователя', err)
    }
})

req4.addEventListener('click', async () => {
    try {
        if (container2.innerHTML != '') {
            container2.innerHTML = ''
        }
        let newName = prompt('Введите название, по которому ищем')
        let newSalary = prompt('Введите новую скидку')
        let newPrice = prompt('Введите новую цену')
        let user = {
            newName,
            newSalary,
            newPrice
        }
        await patchData(`https://lesson-task-13-04-2024.onrender.com/editUser/${newName}`, user)
        const users = await getData('https://lesson-task-13-04-2024.onrender.com/getUsers')
        users.users.forEach(el => {
            if (el.salary != null) {
                container2.insertAdjacentHTML('beforeend', `
            <div class="product-salary">
            <div class="name">name: ${el.name}</div>
            <div class="price">price: </div>
            <div class="real-price">${el.price} =></div>
            <div class="block"></div>
            <div class="not-real-price">${el.price - el.price * el.salary}</div>
        </div>
            `)
            }
        });
    } catch (err) {
        console.error('Произошла ошибка при редактировании пользователя', err)
    }
})
