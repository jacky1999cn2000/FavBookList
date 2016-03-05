import React from 'react';
import Pager from 'react-bootstrap/lib/Pager';
import PageItem from 'react-bootstrap/lib/PageItem';

let BookCollection = React.createClass({

  render: function(){
    return (
      <div className="hidden-xs hidden-sm">
        <ul className="hide-bullets">
            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-0"><img src="https://img3.doubanio.com/mpic/s5860151.jpg"/></a>
            </li>

            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-1"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>

            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-2"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>

            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-3"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>

            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-4"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>

            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-5"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>
            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-6"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>

            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-7"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>

            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-8"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>

            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-9"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>
            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-10"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>

            <li className="col-sm-3">
                <a className="thumbnail" id="carousel-selector-11"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
            </li>


        </ul>
        <Pager>
          <PageItem previous href="#">&larr; Previous</PageItem>
          <PageItem disabled next href="#">Next &rarr;</PageItem>
        </Pager>
      </div>
    );
  }
});

export default BookCollection;
