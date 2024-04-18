function save() {
  canvas = document.getElementById("canvas");
  var link = document.createElement("a");
  link.download = "Canvas.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
