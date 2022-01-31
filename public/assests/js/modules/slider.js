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

  checkEventClientX(event) {
    const { type } = event;

    if (["touchstart", "touchmove", "touchend"].includes(type)) {
      return event.changedTouches[0].clientX;
    }

    return event.clientX;
  }

  checkEventType({ type }) {
    const moveType =
      type === "mouseup" || type === "mousedown" ? "mousemove" : "touchmove";

    return moveType;
  }
  onStart(event) {
    event.preventDefault();
    this.distance.startX = this.checkEventClientX(event);
    this.wrapper.addEventListener(this.checkEventType(event), this.onMove);
  }

  updatePostion(clientX) {
    this.distance.movement = this.distance.startX - clientX;
    return this.distance.finalPosition - this.distance.movement;
  }

  onMove(event) {
    const moveX = this.updatePostion(this.checkEventClientX(event));
    this.moveSlider(moveX);
  }

  moveSlider(valueX) {
    this.distance.movePosition = valueX;
    this.slider.style.transform = `translate3d(${valueX}px, 0 ,0)`;
  }

  onEnd(event) {
    this.distance.finalPosition = this.distance.movePosition;
    this.wrapper.removeEventListener(this.checkEventType(event), this.onMove);
  }

  getSliderPosition(element) {
    const margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2;
    return -(element.offsetLeft - margin);
  }

  checkIndex(index) {
    return !!this.sliderArray[index];
  }

  sliderIndexNav(index) {
    this.indexNav = {
      prev: index--,
      active: index,
      next: index++,
    };
  }

  sliderConfig() {
    this.sliderArray = [...this.slider.children].map((element) => ({
      element,
      position: this.getSliderPosition(element),
    }));
  }

  addSliderEvents() {
    const eventsStart = ["mousedown", "touchstart"];
    const eventsEnd = ["mouseup", "touchend"];

    eventsStart.forEach((event) =>
      this.wrapper.addEventListener(event, this.onStart)
    );

    eventsEnd.forEach((event) =>
      this.wrapper.addEventListener(event, this.onEnd)
    );
  }

  resetSlider() {
    this.moveSlider(this.sliderArray[0].position);
    this.distance.finalPosition = this.sliderArray[0].position;
  }

  changeSlider(index) {
    if (this.checkIndex(index)) {
      const activeSlider = this.sliderArray[index].position;
      this.moveSlider(activeSlider);
      this.sliderIndexNav(index);
      this.distance.finalPosition = activeSlider;
      return;
    }

    this.resetSlider();
  }

  init() {
    this.addSliderEvents();
    this.sliderConfig();
    this.changeSlider(0);
    return this;
  }
}
