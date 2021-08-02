const body = document.querySelector("body")
const buton = document.querySelector("button")
const input = document.querySelector("input")
let dlt ;
let edit ;


//inputa girilen ve local storageden gelen değeri html ekledik

let htmlEkle = (görev)=>{
    let p = document.createElement("p")
    p.textContent = görev.text;

    let dltB = document.createElement("button")
    dltB.textContent ="delete"
    dltB.classList.add("dlt")
    
    let editB = document.createElement("button")
    editB.textContent ="edit"
    editB.classList.add("edit")

    let textDiv = document.createElement("div")
    textDiv.classList.add("text")
    
        // edit kısmı için
    let editDiv = document.createElement("div")
    editDiv.classList.add("editDiv")
    
    let editİnput = document.createElement("input")
    editİnput.type = "text"
    editİnput.classList.add("editİnput")

    let editSave = document.createElement("button")
    editSave.classList.add("editSave")
    editSave.textContent = "save"

    editDiv.appendChild(editİnput)
    editDiv.appendChild(editSave)


    textDiv.appendChild(p)
    textDiv.appendChild(editB)
    textDiv.appendChild(dltB)
    textDiv.appendChild(editDiv)
    

    body.appendChild(textDiv)
}



function openPage(){

    //sayfa yüklenir yüklenmez bu fonksiyonu çalıştırıyoruz

    const görevler = JSON.parse(localStorage.getItem("görevler"))
    let editDiv = document.createElement("div")

    if(!görevler){

        //local storage daki görevler klasörü boşsa veya yoksa boş bir tane oluşturduk  
        localStorage.setItem("görevler",JSON.stringify([]))
    
    }else{
       
        //eğer boş değilse local storagadeki verileri arraye çevirip -
        //htmlEkle fonksiyonu ile birlikte htmle ekledik
        görevler.forEach(element => {
            htmlEkle(element)
        }); 
        dlt =  document.querySelectorAll(".dlt")
        edit = document.querySelectorAll(".edit")
    }
}

openPage()





//burda inputa girilen değeri htmle ve local storge ekledik

const butonF = ()=>{

    // pre.preventDefault();
    
    const görev = {
        text : input.value 
    }
    
    const görevler = JSON.parse(localStorage.getItem("görevler"))
    görevler.push(görev);
    localStorage.setItem("görevler",JSON.stringify(görevler))
    
    
    htmlEkle(görev)

}



// Burda delete tuşuyla görevi silme fonksiyonu
// html den kaldırma işlemi kolay sadece remove eventine bağlı
// local storageden kaldırma işlemi için filtreme işlemi kullandım   

let dltF = (e)=>{

    let görev = e.target.parentElement;
    let text = görev.firstChild.textContent;
    
    // console.log(text);

    let LSgörev = JSON.parse(localStorage.getItem("görevler"))
    LSgörev = LSgörev.filter(görev => görev.text!=text)
    localStorage.setItem("görevler",JSON.stringify(LSgörev))
    
    görev.remove()
}

let editF = (e)=>{
// openPage()
    
    let görev = e.target.previusElementSibling;
    // görev.classList.remove("editDiv")
    console.log(görev);



} 





buton.addEventListener("click",butonF)
dlt.forEach(item=> item.addEventListener("click",dltF))
edit.forEach(item=> item.addEventListener("click",editF))