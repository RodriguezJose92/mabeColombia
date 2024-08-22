/** Server response */
let dataServerMudi;

async function conectServer(skuNumber){
};

function createStyles(){
};

function createButon(father,skuNumber){
};

function createModal(skuNumber){
};

function addExternalDrive (skuNumber){
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
        <img class="mudiQR" src="${dataServer.URL_QR}" >

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
                <p class="textInfoMudi">Amplia y detalla el producto.</p>
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
    dataServer = await conectServer(skuNumber);
    
    if(!dataServer){
        console.warn(`El SKU ${skuNumber} No posee experiencias de 3D y realidad aumentada`)
        return;
    };

    createStyles();
    createButon( fatherContainer , skuNumber); 
    dataLayer.push({
        event: "visualizacionMudi",
        valorMudi: "1"
    });  
};

mudiExperience({
    skuNumber:          document.body.querySelector('.code').innerHTML,
    fatherContainer:    document.body.querySelectorAll(`.image-gallery`)
});
