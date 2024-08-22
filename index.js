/** Server response */
let dataServerMudi;

async function conectServer(skuNumber){

    const myBody = {
        "skus":[skuNumber]
    };

    try {

        /** We make the request to the MUDI server */
        const 
        request = await fetch('https://mudiview.mudi.com.co:7443/product/getProductsUrl',{
            method:'POST',
            headers:{   "Content-type":"application/json",
                        "tokenapi":"QAP9p4Hiq7A9WR5z6Rmu"
            },
            body: JSON.stringify(myBody)
        })
        const 
        response = await request.json();
        dataServerMudi = response.data[0];   

    } catch (error) {console.error(`Mudi Error:\n${error}`)}
    
    return dataServerMudi;
};

function createStyles(){
    const link = document.createElement('LINK');
    link.setAttribute('rel','stylesheet');
    link.id="stylesMudiGeneral";
    link.href=`https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/index.css`; /* Pueden tomarlos de esta ruta */
   
    document.head.appendChild(link)
};

function createButon(father,skuNumber){

    /** We create a container for the 3D button */
    const 
    container       = document.createElement('DIV');
    container.id    =`containerBtnsMudi`;
    container.classList.add(`ContainerBtnsMudi`);

        /* We create an informative poster */
        const 
        tooltip     = document.createElement('P');
        tooltip.id  = `tooltipMudi` ;
        tooltip.classList.add(`mudiTooltip`);
        tooltip.innerHTML=`<p class="paragraphMudi"><b class="newMudi">¡Nuevo!</b> Descubre como se ve este producto en <b>3D y realidad aumentada</b> en tu espacio</p>`;
    
        /** The 3D botton is an image */
        const 
        button3D    = document.createElement('IMG');
        button3D.id = `btn3DProdId`;
        button3D.src= `https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/btn3D.png`;
        button3D.classList.add(`animate-Shaking`);
        button3D.classList.add(`btnMudi3D`);
        button3D.addEventListener('click',()=>{createModal(skuNumber)},false)

    /** Add tooltip and 3D buttton to "container" */
    container.appendChild(tooltip);
    container.appendChild(button3D);

    /** Add container to DOM */
    if(window.innerWidth>1000)father[0].appendChild(container);
    else  father[1].appendChild(container);

};

function createModal(skuNumber){

    /** We create a shell for the MUDI modal */
    const 
    modalMudi = document.createElement('DIV');
    modalMudi.id=`modalMudi`;
    modalMudi.classList.add(`mudiModal`);
    modalMudi.innerHTML=`
        <div class="iframeMudi3D">
            <button class="closeModalMudi">X</button>
            <iframe class="modelMudi" src="${dataServerMudi.URL_WEB}"></iframe>
            <div class="containerBtnsActions">
                <img id='btnVerEnMiEspacioId' class="btnMudiAR" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/AROn2.png"/>
            </div>
        </div>
    `;
    
    /** Verificamos si el producto es un aire acondicionado y añadimos la unidad externa  */
    if (skuNumber.includes('MMT') || skuNumber.includes('MMI')) {
        modalMudi.querySelector('.containerBtnsActions').appendChild(addExternalDrive(skuNumber));
    }

    /** Verificamos si el producto es una cubierta y añadimos la información de tamaño */
    if (skuNumber.includes('PM')) {
        const sizeInfo = addSize(skuNumber);
        modalMudi.querySelector('.iframeMudi3D').appendChild(sizeInfo);
    }

    /** We close the MUDI modal*/
    modalMudi.querySelector(`.closeModalMudi`).addEventListener('click',()=>{
        document.body.querySelector('#modalMudi').remove();
    });

    /** Init ARExperience */
    modalMudi.querySelector(`#btnVerEnMiEspacioId`).addEventListener('click',()=>{
        if(window.innerWidth>1000) initARDESK();
        else window.open(`${dataServerMudi.URL_AR}`,"_BLANK")
    });

    document.body.appendChild(modalMudi);
};

function addExternalDrive (skuNumber){
    
    /** Model 3d model3D */
    let model3D, urlExternalDrive;

    /** Verificamos que unidad externa es */
    skuNumber.includes('MMT') 
    ? urlExternalDrive = "https://viewer.mudi.com.co/v1/web/?id=105&sku=UE_Azul" 
    : urlExternalDrive ="https://viewer.mudi.com.co/v1/web/?id=105&sku=UE_Dorada";

    /** Buttones */
    const 
    button = document.createElement('IMG');
    button.classList.add('btn3DAires');
    button.id="externalDrive";
    button.src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/btn3DOn.png"

    /** Añadimos la funcionalidad */
    button.addEventListener('click',()=>{
        
        !model3D 
        ? (
            document.body.querySelector('.modelMudi').src=urlExternalDrive,
            button.src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/btn3DOff.png"
          ) 
        : (
            document.body.querySelector('.modelMudi').src=dataServerMudi.URL_WEB,
            button.src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/btn3DOn.png"
           );

        model3D = !model3D;
    });

    return button;
};

function addSize(skuNumber) {
    const sizeInfo = document.createElement('DIV');
    sizeInfo.classList.add('sizeInfoText');  // Añadimos una clase para el estilo

    if (skuNumber.includes('PM')) {
        sizeInfo.innerText = "Medidas de instalación: Ancho: 55.7cm Largo: 47.7cm"; 
    }

    return sizeInfo;
};

function initARDESK(){

    document.body.querySelector('#btnVerEnMiEspacioId').src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/AROff.png";

    if(document.body.querySelector('#containerQR')) {
        document.body.querySelector('#btnVerEnMiEspacioId').src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/AROn2.png"
        document.body.querySelector('#containerQR').remove();
        return
    };

    const 
    modalMudi = document.createElement('DIV');
    modalMudi.id=`containerQR`;
    modalMudi.classList.add(`containerQRMudi`);
    modalMudi.innerHTML=`
        <img class="mudiQR" src="${dataServerMudi.URL_QR}" >

        <div class="containerText">
            <div class="titleContainer">
                <h4>ESCANÉAME PARA <br><b>VER EN TU ESPACIO</b></h4>
                <hr class="hrTitle">
            </div>

            <div class="titleContainer">
                <div class="iconTitle">
                    <img class="stepMudi step1" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/step1Mabe.webp">
                </div>
                <p class="textInfoMudi">Apunta el teléfono al piso.</p>
            </div>

            <div class="titleContainer">
                <div class="iconTitle">
                    <img class="stepMudi step2" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/step2Mabe.webp">
                </div>
                <p class="textInfoMudi">Desplaza para visualizar.</p>
            </div>

            <div class="titleContainer">
                <div class="iconTitle">
                    <img class="stepMudi step3" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/step3Mabe.webp">
                </div>
                <p class="textInfoMudi">Amplía y detalla el producto.</p>
            </div>

            <div class="titleContainer">
                <div class="iconTitle">
                    <img class="stepMudi step4" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/mabeColombia@latest/assets/step4Mabe.webp">
                </div>
                <p class="textInfoMudi">Toca dos veces para restablecer.</p>
            </div>

        </div>

    `;

    document.body.querySelector('.iframeMudi3D').appendChild(modalMudi)
};

async function mudiExperience({skuNumber,fatherContainer}){

    const 
    dataServerMudi = await conectServer(skuNumber);

    if(!dataServerMudi.URL_WEB)return;

    createStyles();
    createButon(fatherContainer,skuNumber);
    
};
