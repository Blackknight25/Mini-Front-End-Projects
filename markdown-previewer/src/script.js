document.addEventListener('DOMContentLoaded', function() {
  const editorElem = document.getElementById('editor');
  const previewElem = document.getElementById('preview');
  
  marked.setOptions({
    breaks: true,
  });
  
  const handleChange = (event) =>{
    const input = event.target.value;
    const html = marked.parse(input);
    previewElem.innerHTML = html;
  }
  editorElem.addEventListener('input', handleChange);
  const initialMarkdown = editorElem.value;
  const initialHtml = marked.parse(initialMarkdown);
  previewElem.innerHTML = initialHtml;
});