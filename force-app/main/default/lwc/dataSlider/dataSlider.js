import { api, LightningElement } from 'lwc';


export default class DataSlider extends LightningElement {

     /*data = [
            {
              "image": "some link 1",
              "heading": "Slide 1",
              "description": "Some description for slide 1"
            },
            {
              "image": "another link 2",
              "heading": "Slide 2",
              "description": "Some description for slide 2"
            },
            {
                "image": "some link 3",
                "heading": "Slide 3",
                "description": "Some description for slide 3"
              },
              {
                "image": "another link 4",
                "heading": "Slide 4",
                "description": "Some description for slide 4"
              }
          ]*/
//"autoScroll": true
    /**
   * If present, automatic slide scrolling will be enabled.
   * @type {boolean}
   * @default false
   */
  @api autoScroll = false;

  /**
   * Set maximum height of the slider in percent or pixels.
   * @type {string}
   * @default ''
   */
  @api customHeight = '';
  /**
   * Set maximum width of the slider in percent or pixels.
   * @type {string}
   * @default '600px'
   */
  @api customWidth = '600px';
  /**
   * If present, the "next" and "prev" navigation buttons will be hidden.
   * @type {boolean}
   * @default false
   */
  @api hideNavigationButtons = false;
  /**
   * If present, the navigation dots below the slider will be hidden.
   * @type {boolean}
   * @default false
   */
  @api hideNavigationDots = false;
  /**
   * If present, the current slide number will be hidden.
   * @type {boolean}
   * @default false
   */
  @api hideSlideNumber = false;
  /**
   * If present, the text overlay with heading and description will be hidden.
   * @type {boolean}
   * @default false
   */
  @api hideSlideText = false;
  /**
   * Set the duration in milliseconds after which the next slide should be displayed.
   * @type {number}
   * @default 5000
   */
  @api scrollDuration = 5000;
  slides = [];
  slideIndex = 1;
  timer;
  get maxWidth() {
    debugger;
    return `width: ${this.customWidth}`;
  }
  get maxHeight() {
    debugger;
    return `height: ${this.customHeight}`;
  }
  /**
   * A list of slides that are displayed in the custom slider.
   * Each slide has the following attributes: image, heading and description.
   * @type {Array}
   * @example
   * slideData = [
   *   {
   *     "image": "some image link",
   *     "heading": "Slide 1",
   *     "description": "Some description for slide 1"
   *   },
   *   {
   *     "image": "another image link",
   *     "heading": "Slide 2",
   *     "description": "Some description for slide 2"
   *   }
   * ]
   */
  @api get slidesData() {
    debugger;
    return this.slides;
  }
  set slidesData(data) {
    debugger;
    this.slides = data.map((slide, i) => {
      if (i === 0) {
        return {
          ...slide,
          index: i + 1,
          slideClass: 'fade slds-show',
          dotClass: 'dot active'
        };
      }
      return {
        ...slide,
        index: i + 1,
        slideClass: 'fade slds-hide',
        dotClass: 'dot'
      };
    });
  }

  connectedCallback() {
    debugger;
    if (this.autoScroll) {
      this.timer = window.setInterval(() => {
        this.handleSlideSelection(this.slideIndex + 1);
      }, Number(this.scrollDuration));
    }
  }

  disconnectedCallback() {
    debugger;
    if (this.autoScroll) {
      window.clearInterval(this.timer);
    }
  }

  showSlide(event) {
    debugger;
    const slideIndex = Number(event.target.dataset.id);
    this.handleSlideSelection(slideIndex);
  }

  slideBackward() {
    debugger;
    const slideIndex = this.slideIndex - 1;
    this.handleSlideSelection(slideIndex);
  }

  slideForward() {
    debugger;
    const slideIndex = this.slideIndex + 1;
    this.handleSlideSelection(slideIndex);
  }

  handleSlideSelection(index) {
    debugger;
    if (index > this.slides.length) {
      this.slideIndex = 1;
    } else if (index < 1) {
      this.slideIndex = this.slides.length;
    } else {
      this.slideIndex = index;
    }

    this.slides = this.slides.map((slide) => {
      if (this.slideIndex === slide.index) {
        return {
          ...slide,
          slideClass: 'fade slds-show',
          dotClass: 'dot active'
        };
      }
      return {
        ...slide,
        slideClass: 'fade slds-hide',
        dotClass: 'dot'
      };
    });
  }
}