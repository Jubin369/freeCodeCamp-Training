//link:https://www.freecodecamp.org/challenges/get-json-with-the-jquery-getjson-method



<script>
  $(document).ready(function() {

    $("#getMessage").on("click", function(){
      $.getJSON("/json/cats.json", function(json) {
        $(".message").html(JSON.stringify(json));
      });
    });

  });
</script>

<div class="container-fluid">
  <div class = "row text-center">
    <h2>Cat Photo Finder</h2>
  </div>
  <div class = "row text-center">
    <div class = "col-xs-12 well message">
      The message will go here
    </div>
  </div>
  <div class = "row text-center">
    <div class = "col-xs-12">
      <button id = "getMessage" class = "btn btn-primary">
        Get Message
      </button>
    </div>
  </div>
</div>
