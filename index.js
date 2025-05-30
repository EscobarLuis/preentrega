import process, { argv } from 'process';
const direccion = 'https://fakestoreapi.com/products/'
/* elimino los dos primeros array que me llegan, no los uso */
const args = process.argv.slice(2);


/* El primer parametro tiene que ser un verbo, con un swich evaluo cual tengo que procesar */
switch(args[0]) {
    case "GET":
        if (args[1].includes('/')){
            //Me quedo con el numero del producto que debemos consultar
            const producto = args[1].substring(args[1].indexOf('/') + 1);
         
            //consulto a la api por el producto en especifico y muestro por pantalla                
            fetch(direccion.concat(producto))
            .then(response => response.json())
            .then(data => console.log(data));

            
        }
        else{
            //La consulta se hace para todos los productos
            fetch(direccion)
            .then(response => response.json())
            .then(data => console.log(data));
        }
        break;        
        
    case "DELETE":
        //Tengo una consulta para borrar un producto determinado
        const producto = args[1].substring(args[1].indexOf('/') + 1);
        //Creo un string con la consulta
        const consulta = direccion.concat(producto);
        //Ejecuto la consulta y muestro el resultado por pantalla
        fetch(consulta, {
        method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => console.log(data));
        break;

    case "POST":
        //Tengo una consulta para agregar un producto         
        const product = { title: args[2], price: args[3], category: args[4] };
        fetch(direccion, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => console.log(data)); 
        break;
        
    default:
        console.log("Opcion incorrecta.");
        break;
}

//npm run start GET products, => consulta por todos los productos

//npm run start GET products/15 => consulta por un producto determinado

//npm run start POST products <title> <price> <category> => hace una peticion POST para agregar un producto

//npm run start DELETE products/15 =>hace una peticion DELETE para borrar un producto determinado

