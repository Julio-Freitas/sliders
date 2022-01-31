export default class SliderJS {
  constructor({ slider, wrapper }) {
    this.slider = document.querySelector(slider);
    this.wrapper = document.querySelector(wrapper);

    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };

    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onStart(event) {
    event.preventDefault();
    this.distance.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  updatePostion(clientX) {
    this.distance.movement = this.distance.startX - clientX;
    return this.distance.finalPosition - this.distance.movement;
  }

  onMove(event) {
    const moveX = this.updatePostion(event.clientX);
    this.moveSlider(moveX);
  }

  moveSlider(valueX) {
    this.distance.movePosition = valueX;
    this.slider.style.transform = `translate3d(${valueX}px, 0 ,0)`;
  }

  onEnd(event) {
    this.distance.finalPosition = this.distance.movePosition;
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }

  addSliderEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  init() {
    this.addSliderEvents();
    return this;
  }
}
