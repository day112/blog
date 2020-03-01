### jQuery表单提交回调

```html
<form id="form">
...
<button type="submit"></button>
</form>

<script>
$(document).ready(function() {
  $("#form").submit(function() {
    $.ajax({
     type: "POST",
      url: "form_handler.php",
      data: $(this).serialize(),
      success: function() {
        // callback code here
       }
    })
  })
})
</script>
```



###  解决序列化不能传文件的问题

```html
<form id="uploadForm">  
      <p>上传文件：<input type="file" name="file" /></p>  
      <input type="button" value="上传" οnclick="upload()" />  
</form>
 
<script>
function upload() {  
     var formData = new FormData($("#uploadForm")[0]);  
     $.ajax({  
          url: '',  
          type: 'POST',  
          data: formData,  
          async: false,  
          cache: false,  
          contentType: false,  
          processData: false,  
          success: function(data) {
          },  
          error: function(data) {     
          }  
     });  
}
</script>


```

