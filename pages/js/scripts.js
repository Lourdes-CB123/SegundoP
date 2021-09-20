const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img} width="150" alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total Q. ${Total}`
  addLocalStorage()
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}

/*funcion de Compra*/
var productos = [];

function Product(codigo,nombre,precio){
    this.codigo = codigo,
    this.nombre = nombre,
    this.precio = precio
}

function addProductArray(){

    var codigo = document.getElementById("idCodigo").value;
    var nombre = document.getElementById("idNombre").value;
    var precio = document.getElementById("idPrecio").value;

    var product = new Product(codigo,nombre,precio);

    productos.push(product);

}

function populateTable(){

    debugger;

    var scriptTable = "";

    for (let index = 0; index < productos.length; index++) {
        scriptTable += "<tr>";
        scriptTable += "<td>" + productos[index].codigo + "</td>" ;
        scriptTable += "<td>" + productos[index].nombre + "</td>" ;
        scriptTable += "<td>" + productos[index].precio + "</td>" ;
        scriptTable += "</tr>";
    }

    document.getElementById("idTableBody").innerHTML = scriptTable

}


function validateFields(){


    if (document.getElementById("idCodigo").value == "") {
        alert("El campo CODIGO no debe quedar vacío");
        return false;
    }

    if (document.getElementById("idNombre").value == "") {
        alert("El campo NOMBRE no debe quedar vacío");
        return false;
    }

    if (document.getElementById("idPrecio").value == "") {
        alert("El campo PRECIO no debe quedar vacío");
        return false;
    }

}

function cleanControls(){

    document.getElementById("idCodigo").value = "";
    document.getElementById("idNombre").value = "";
    document.getElementById("idPrecio").value = "";

}


function addProduct(){

    // Validar campos

    if (validateFields() == false){
        return false;
    }

    // Agregamos el producto a un arreglo

    addProductArray();


    // Poblamos la tabla

    populateTable();


    // Limpiamos los campos
    cleanControls();


}

/*funcion del login*/
let button = document.getElementById("ingresar");

button.addEventListener("click", (e) =>{
  login();
})

function login()
		{
			let usuario = document.getElementById("usuario").value;
			let password = document.getElementById("password").value;	

			if(usuario == "admin" && password == "12345")
			{
        document.location.href="inventario.html";
			}
			else
			{
				alert("Datos incorrectos");
			}
		}