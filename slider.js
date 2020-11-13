import Slider from './lib/index'

const e = React.createElement;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  slidesPerRow: 1,
  rows: 1,
};

class MySlider extends React.Component {
  constructor() {

  }


  render() {
    return e(
      <Slider {...settings}>
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
        <div>
          <h1>3</h1>
        </div>
        <div>
          <h1>4</h1>
        </div>
        <div>
          <h1>5</h1>
        </div>
      </Slider>
    )
  }

}

export default MySlider