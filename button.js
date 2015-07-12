//post function
var $post = function() {
  app.post('/articles', function(req,res){
    var $title = $("#POST_title").val();
    var $blog = $("#POST_blog").val();
    console.log($title);
    console.log($blog);
});

$('#btn').click(function() {
  $post();
})
//get function
var $get =function () {


}
