import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ContactUs from './sponsors/contactUs'
import CodingBlocks from './sponsors/codingBlocks'
import Qit from './sponsors/qit'

export default class Sponsors extends React.Component {
  render () {
    var settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <section className='section sponsors'>
        <div className='container'>
          <Slider {...settings}>
            <CodingBlocks />
            <Qit />
            <ContactUs />
          </Slider>
        </div>
      </section>
    )
  }
}
