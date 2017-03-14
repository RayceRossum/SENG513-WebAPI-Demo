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
