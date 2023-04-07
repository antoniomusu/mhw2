/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

//Generalizzo salvando il numero delle domande
const numberQuestions=document.querySelectorAll(".choice-grid").length;

//Mappa la domanda alla risposta
let answers={};


//Funzione restart, attiva i listener, pulisce answers e ripristina la pagina
function Restart(event){
    event.currentTarget.removeEventListener('click', Restart);
    const resultblock = document.querySelector("#risultato");
    resultblock.classList.add("hide");
    answers = {}; //Svuoto per riutilizzarlo
    console.log(answers);
    const boxes = document.querySelectorAll(".choice-grid div");
    for(let box of boxes){
        box.classList.remove("active","inactive");
        let checkbox = box.querySelector(".checkbox");
        checkbox.src="./unchecked.png";
        box.addEventListener('click', AnswerQuestions);    
    }
    window.scroll({top:0});
    

 }

//Opzione 2: Funzione generalizzata che trova il numero di ripetizioni di una risposta
function FindResult(){
    let counters={};
    const values=Object.values(answers);
    let maxValue = answers["one"];
    for(let value of values){
        if(counters[value]===undefined)
            counters[value]=0;
        counters[value]++;
        if(counters[value]>counters[maxValue])
            maxValue=value; 
    }
    return maxValue;
}
//Funzione che mostra il risultato e attiva il button
function ShowResults(){
    const resultblock = document.querySelector(".hide");

    //Opzione 1: Assegnamento con tre domande (Non generale)
    /*if(answers["one"]===answers["two"])
    {
        result = answers["one"];
    }
    else if(answers["two"] === answers["three"]){
        result = answers["two"];
    }
    else{
        result = answers["one"];
    }*/
    let result = FindResult();
    console.log("Il risultato è " + result);
    const title = resultblock.querySelector("h1");
    title.textContent = RESULTS_MAP[result].title;
    const contents = resultblock.querySelector("div");
    contents.textContent = RESULTS_MAP[result].contents;
    resultblock.classList.remove("hide");
    window.scrollTo(0, document.body.scrollHeight);
}

//Funzione che controlla abbia risposto a tutte le domande e toglie i listener
function IsFinish(){

    //Opzione 1: Controllo se sono definiti (poco generale)
    /*const finishCondition = 
        answers["one"] !== undefined && 
        answers["two"] !== undefined && 
        answers["three"]!==undefined;
        */

    //Opzione 2: Controllo che il numero di chiavi di answers è pari al numero di domande
    if(numberQuestions===Object.keys(answers).length)
    {
        const boxes = document.querySelectorAll('.choice-grid div');
        for(let box of boxes) {
            box.removeEventListener('click', AnswerQuestions);
        }
        return true;
    }
    else
        return false;

}

//Funzione che assegna ad un indice della mappa il valore di tale risposta
function AssignAnswer(answer) {
    const index = answer.dataset.questionId;
    answers[index]= answer.dataset.choiceId;
    console.log(answers);
}

//Funzione che attiva la scelta
function ActiveAnswer(answer) {
    AssignAnswer(answer);
    answer.classList.remove("inactive");
    answer.classList.add("active");
    const checkbox = answer.querySelector(".checkbox");
    checkbox.src = "./checked.png";
  

}

//Funzione che disattiva (visualmente) le altre scelte
function DeactiveAnswer( grid, actuallyActive ){
    const cointainers = grid.querySelectorAll("div");
    for( let container of cointainers ){
        
        if( container !== actuallyActive ){
            container.classList.remove("active");
            container.classList.add("inactive");
            const checkbox = container.querySelector(".checkbox");
            checkbox.src = "./unchecked.png";
        }
        
    }

}

//Event handler
function AnswerQuestions(event){
    console.log("Evento");
    ActiveAnswer(event.currentTarget);
    DeactiveAnswer(event.currentTarget.parentElement,event.currentTarget);
    if(IsFinish()){
        ShowResults();  
        const restartButton = document.querySelector("#risultato button");
        restartButton.addEventListener('click', Restart);
    }

}

//MAIN
const boxes = document.querySelectorAll('.choice-grid div');
for(let box of boxes) {
    box.addEventListener('click', AnswerQuestions);
}

