
async function fetchCategoryJSON() {
  const response = await fetch('http://jservice.io/api/categories?count=1');
  const answers = await response.json();
  return answers;
}

fetchCategoryJSON().then(answers => {
  console.log(answers);
createBoard(answers);

});
function createBoard(ans){
  document.getElementById('category').innerHTML = ans.title;
}
