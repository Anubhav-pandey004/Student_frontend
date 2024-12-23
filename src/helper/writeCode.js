const writeCode=()=>{
    const textBox = document.getElementById("description")||document.getElementById("answer")
    const start = textBox.selectionStart;
    const end = textBox.selectionEnd;
    console.log(start, end);
    const text = textBox.value.substring(start, end);
    let boldText = `<div class="code">${text}</div>`;
    textBox.value = textBox.value.substring(0, start) + boldText + textBox.value.substring(end);
  };

  export default writeCode;