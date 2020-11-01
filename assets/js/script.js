// obtenido de postman
/*fetch("https://api.github.com/users/erc83", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));*/

    async function request(url){       //esta funcion es una promesa y esperamos que retorne el resultado en la linea 18 desde la linea 10
        try{
            const resp = await fetch(url).then(response => response.json())    //.text al cambiarlo por jason funciona  
            return resp                 //aqui podria hacer el console.log pero no es lo que queremos
        }catch(err){
            console.log(err)
        }   
    }
    async function getUser(user){                   
        return await request(`https://api.github.com/users/${user}`);  // aqui retorna la funcion request de la linea 7
    }
    
    async function getRepo(user,page,perPage){  //page y perPage son clasicos de paginas que tienen muchos registros que numero de pagina quiero y cuantos registros se llama paginacion
        return await request(`https://api.github.com/users/${user}/repos?page=${page}&per_page=${perPage}.`);
    }
    
    let btn = $('button')
    
    btn.on('click',(e)=>{
        e.preventDefault()
        let user = $('#nombre').val()
        let page = $('#pagina').val()
        let perPage = $('#repoPagina').val()

        Promise.all([getUser(user), getRepo(user,page,perPage)]).then(results => { //anclando la promesa al botton
        printHTML(results)
        })
    })        
    function printHTML(data){  
        let userInfo = document.createElement('div')
        let repoInfo = document.createElement('div')
        let userTitle = document.createElement('h2')
        let repoTitle = document.createElement('h2')
    
        userTitle.innerHTML = 'Informacion del usuario'
        repoTitle.innerHTML = 'Informacion de los repositorios'

        let userUl = document.createElement('ul')
        let repoUl = document.createElement('ul');
        ['name', 'login', 'public_repos', 'location', 'type', 'node_id'].forEach(element => {  // crear un string en data [0]
            let li = document.createElement('li')
            let value = data[0][element] || 'No se ha definido'     // esta linea estaba faltando para completar 
            li.innerHTML = `<strong>${element}: </strong> ${value}`    
            userUl.appendChild(li)          //aqui le pasamos li
        });

        data[1].forEach(element => {
            let li = document.createElement('li')
            li.innerHTML = `${element.name}`

            repoUl.appendChild(li)
        });

        userInfo.className = 'userInfo col-6'
        repoInfo.className = 'repoInfo col-6'
        userInfo.appendChild(userTitle)
        userInfo.appendChild(userUl)
        repoInfo.appendChild(repoTitle)
        repoInfo.appendChild(repoUl)
    
        $('#resultados').empty()
        $('#resultados').append(userInfo)
        $('#resultados').append(repoInfo)
    }