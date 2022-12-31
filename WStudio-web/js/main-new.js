function Rnew(C, T, A) {
  var m =
    '<dd>•<a href=""+A+"" style=" color: ' +
    C +
    ';text-shadow: 1px 0px 1px rgba(180,180,180,0.6);margin: 5px;padding: 5px;ling-height: 1.5em;">' +
    T +
    '</a></dd><p class="break" style="line-height: 0.6em;">-</p>';
  return m;
}

function boxRNew() {
  const temp = document.getElementById("boxRNew");

  temp.innerHTML +="";
    //Rnew("red", "TEST");
}
boxRNew();
