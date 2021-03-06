$('#fileUpload').submit(function(event) {
    event.preventDefault();
    $.ajax({
        url : "/upload",//path of url where u want to submit form
        type : "POST",
        data :  new FormData(this),
        processData: false,
        contentType: false,
        success : function(data) {
              $("#labels tr td").remove();
              data.forEach(function (elem, index) {
                $("#labels").append("<tr><td>" + JSON.stringify(elem,null,4) + "</td></tr>");
              });
              $("#labelResult").text(data[0].description);

        }
    });
});

$('#file').change(function() {
  readURL(this);
});

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imagePreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
