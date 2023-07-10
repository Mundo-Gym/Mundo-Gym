



const handlerInput = (e, setForm, form, setCondition) =>{

    let property = e.target.name;
    let value = e.target.value
    console.log(property);

    setForm({
        ...form,
        [property]: e.target.value
    })

    if(property === "name"){
    if(value.match("^[a-zA-Z1-9ñÑáéíóúÁÉÍÓÚ° -]{1,25}$")) setCondition("")
    else setCondition("Solo se permiten mayusculas, minusculas, guiones y numeros")
    }

    if(property === "Category"){
        const categoryRegex = /^[\s\S]{4,50}$/;
        if(!value.match(categoryRegex)) setCondition("Debe llenar el campo categoria")
    else setCondition("")
    }

    if(property === "subcategory"){
        const subCategoryRegex = /^[\s\S]{4,50}$/;
        if(!value.match(subCategoryRegex)) setCondition("Debe llenar el campo subcategoria")
    else setCondition("")
    }

    if(property === "price"){
        const priceRegex = /^[1-9]\d*$/;   //regex para un numero positivo
        if(!value.match(priceRegex)) setCondition("El precio debe ser mayor a 0")
    else setCondition("")
    }

    if(property === "cost"){
        const costRegex = /^[1-9]\d*$/;   
        if(!value.match(costRegex)) setCondition("El costo debe ser mayor a 0")
    else setCondition("")
    }

    if(property === "stock"){
        const stockRegex = /^[1-9]\d*$/;   
        if(!value.match(stockRegex)) setCondition("El stock debe ser mayor a 0")
    else setCondition("")
    }

    // if(property === "supplier"){
    //     const supplierRegex = /^[a-zA-Z0-9]{30}$/;  //regex para que el proveedor conste de hasta 30 caracteres y numeros
    //     if(!value.match(supplierRegex)) setCondition("Debe ingresar un proveedor")
    // else setCondition("")
    // }


    if(property === "image"){
        const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        if(!value.match(urlRegex)) setCondition("El url no es valido")
        else setCondition("")
    }

    

    if(property === "description"){
        const descriptionRegex = /^[\s\S]{10,2000}$/;
        if(!value.match(descriptionRegex)) setCondition("Debe llenar el campo descripción")
        else setCondition("")
    }

    // if(property === "rating"){
        
    //     if(value > 5 | value < 0) setCondition("El rating debe ser entre 0 a 5 ")
    //     else setCondition("")
    // }
    // if(property === "release_date"){
        
    //     if(value.length !== 10){
    //         setCondition("Debe agregar una fecha")
    //     }else{
    //         setCondition("")
    //     }
    // }
}
    

export default handlerInput;