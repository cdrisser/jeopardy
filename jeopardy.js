
$(document).ready(()=>{
  $('#col-options').change(()=>{
//remove column in case it middle of Game
$('.col').remove();
//send number of column requested to function to dynamicaly load

  addCols(Number($('#col-options').val()));
  });
});

async function fetchQandAs(id,i){
  const fetchstr = `http://jservice.io/api/clues?category=${id}`
  console.log(fetchstr);
  const response = await fetch(fetchstr);
  const answers = await response.json();
  loadQuestions(answers,i);
}
/*Function that load the questions and answers into the Jeopardy
buttons*/
function loadQuestions(answers,colnum){
  for(let i = 0;i<answers.length; i++){
     $(`#category${colnum}-${i}`).click(()=>{
        $(`#category${colnum}-${i}`).html(answers[i].question);
        setTimeout(()=>{
          $(`#category${colnum}-${i}`).html(answers[i].answer);
        },7000)
     });
  }
}
function addCols(numCols){
  console.log(numCols);
  let intamt = 200;
  for(let i=0;i<numCols;i++){
    let newdiv = $(`<div class=col></div>`);
    let butcat = $(`<button id=category${i}></button>`);
    newdiv.append(butcat);
    for(let j=0;j<5;j++){
      let but = $(`<button id=category${i}-${j}>$${intamt}</button>`);
      newdiv.append(but);
      intamt+=200;
    }
    intamt = 200;
    $("#each-col").append(newdiv);
  }
  fetchCategoryJSON().then(answers => {
  createTitle(answers, numCols);

  });
}
async function fetchCategoryJSON() {
  const response = await fetch('http:jservice.io/api/categories?count=100');
  const answers = await response.json();
  return answers;
}

function createTitle(ans, numCols){
  console.log(ans)
  //create randomnumber between 1-100 to get random category from api
  for(let i =0; i<numCols; i++){
    console.log(numCols);
  const randomnumber = Math.floor(Math.random()*(100-1)+1);
  document.getElementById(`category${i}`).innerHTML = ans[randomnumber].title;
  fetchQandAs(ans[randomnumber].id, i );
}
}
