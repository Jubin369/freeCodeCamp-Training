//link:https://www.freecodecamp.org/challenges/get-geolocation-data


<script>
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
  });
  }
</script>
<div id = "data">
  <h4>You are here:</h4>
  
</div>
