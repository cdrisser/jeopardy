$(document).ready(()=>{
  $('#category').click(()=>{
    getCategory();
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
  //console.log(ans[randomnumber].id);
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
function loadQuestions(answers){
  for(let i = 0;i<answers.length; i++){

     $(`#${i}`).click(()=>{
       console.log(`#${i}`);
        $(`#${i}`).html(answers[i].question);
     });
  }
}
getCategory();
