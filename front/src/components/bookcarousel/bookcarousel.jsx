import React from 'react';
import Label from 'react-bootstrap/lib/Label';
import Badge from 'react-bootstrap/lib/Badge';
import Button from 'react-bootstrap/lib/Button';
import BookCarouselItem from '../bookcarouselitem/bookcarouselitem';

let BookCarousel = React.createClass({

  getInitialState() {
    return {

    };
  },

  componentDidMount: function(){
    $('#book-carousel').carousel({interval: 5000});
  },

  testckick: function(){
    $('#book-carousel').carousel(0);
  },

  carouselItems: function(books){
    let carouselItems = [];

    books.map((item, i) => {
      let carouselItem = <BookCarouselItem key={item.id} item={item} i={i}/>
      carouselItems.push(carouselItem)
    });

    return carouselItems;
  },

  render: function() {

    let carouselItems = this.carouselItems(this.props.books);

    return (
      <div>
        <div className="booklist-info">
          <Label bsStyle="info">{this.props.currentBKL.name}</Label>&nbsp;&nbsp;&nbsp;<Badge>42</Badge>
        </div>

        <div id="book-carousel" className="carousel slide">
          <div className="carousel-inner">
            {carouselItems}
          </div>

          <a className="left carousel-control" href="#book-carousel" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
          </a>
          <a className="right carousel-control" href="#book-carousel" role="button" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
          </a>
        </div>
      </div>
    );
  }
});

export default BookCarousel;

// <div className="item active">
//   <img src="https://img3.doubanio.com/lpic/s5860151.jpg" alt="..."/>
//   <div className="carousel-caption">
//       <h3>Caption Text</h3>
//   </div>
// </div>
// <div className="item">
//   <img src="https://img3.doubanio.com/lpic/s5860151.jpg" alt="..."/>
//   <div className="carousel-caption">
//       <h3>Caption Text</h3>
//   </div>
// </div>
// <div className="item">
//   <img src="https://img3.doubanio.com/lpic/s5860151.jpg" alt="..."/>
//   <div className="carousel-caption">
//       <h3>Caption Text</h3>
//   </div>
// </div>
