const movement = {
  addListener: function addMovementListener() {
    document.addEventListener("keydown", onDocumentKeyDown, false);
  },
  controls: function onDocumentKeyDown(props) {
    const { event, object } = props;
    const xSpeed = 0.0001;
    const ySpeed = 0.0001;

    const keyCode = event.which;
    if (keyCode == 87) {
      object.position.y += ySpeed;
    } else if (keyCode == 83) {
      object.position.y -= ySpeed;
    } else if (keyCode == 65) {
      object.position.x -= xSpeed;
    } else if (keyCode == 68) {
      object.position.x += xSpeed;
    } else if (keyCode == 32) {
      object.position.set(0, 0, 0);
    }
  },
};

export default movement;
