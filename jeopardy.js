$(document).ready(()=>{
  $('#category').click(()=>{
    getCategory();
  });
  $('#col-options').change(()=>{
  let a = $('#col-options').val();
  alert(a);
});
});
async function fetchCategoryJSON() {
  const response = await fetch('http:jservice.io/api/categories?count=100');
  const answers = await response.json();
  return answers;
}
function getCategory(){
  let initialvalue = 200;
  for(let i = 0;i<5; i++){
       console.log(`#${i}`);
        $(`#${i}`).html(`$${initialvalue}`);
        initialvalue+=200;

  }
fetchCategoryJSON().then(answers => {
createTitle(answers);

});
}
function createTitle(ans){
  //create randomnumber between 1-100 to get random category from api
  const randomnumber = Math.floor(Math.random()*(100-1)+1);
  document.getElementById('category').innerHTML = ans[randomnumber].title;
  fetchQandAs(ans[randomnumber].id);
}
async function fetchQandAs(id){
  const fetchstr = `http://jservice.io/api/clues?category=${id}`
  console.log(fetchstr);
  const response = await fetch(fetchstr);
  const answers = await response.json();
  loadQuestions(answers);
}
/*Function that load the questions and answers into the Jeopardy
buttons*/
function loadQuestions(answers){
  for(let i = 0;i<answers.length; i++){
     $(`#${i}`).click(()=>{
        $(`#${i}`).html(answers[i].question);
        setTimeout(()=>{
          $(`#${i}`).html(answers[i].answer);
        },7000)
     });
  }
}
getCategory();
