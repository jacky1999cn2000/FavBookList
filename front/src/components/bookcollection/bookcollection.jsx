import React from 'react';
import Pager from 'react-bootstrap/lib/Pager';
import PageItem from 'react-bootstrap/lib/PageItem';
import BookCollectionItem from '../bookcollectionitem/bookcollectionitem';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

let BookCollection = React.createClass({

  getInitialState() {
    return {
      currentPage: 1,
      lastPage: this.props.books.length/12 + 2
    };
  },

  bookItemHandler: function(item, i, e){
    e.preventDefault();
    console.log('bookItemHandler');
    console.log('i ',i);
    console.log('item ',item);
    $('#book-carousel').carousel(0);
  },

  bookItems: function(books){
    let bookItems = [];

    books.map((item, i) => {

      if(i < this.state.currentPage*12 && i >= (this.state.currentPage-1)*12){
        let boundBookItemHandler = this.bookItemHandler.bind(this, item, i);
        let bookItem = <BookCollectionItem key={item.id} item={item} onClick={boundBookItemHandler}/>
        bookItems.push(bookItem)
      }
    });

    return bookItems;
  },

  next: function(){
    if(this.state.currentPage == this.state.lastPage) return;
    this.setState({currentPage:this.state.currentPage+1});
  },

  previous: function(){
    if(this.state.currentPage == 1) return;
    this.setState({currentPage:this.state.currentPage-1});
  },

  render: function(){

    let bookItems = this.bookItems(this.props.books);
    let prevDisabled = this.state.currentPage == 1;
    let nextDisabled = this.state.currentPage == this.state.lastPage;

    return (
      <div className="hidden-xs hidden-sm">
        <ReactCSSTransitionReplace transitionName="slide" transitionAppear={true} transitionAppearTimeout={500}transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          <div key={this.state.currentPage} className="collection">
            <ul className="hide-bullets">
              {bookItems}
            </ul>
          </div>
        </ReactCSSTransitionReplace>
        <Pager>
          <PageItem disabled={prevDisabled} previous onClick={this.previous}>&larr; Previous</PageItem>
          <PageItem disabled={nextDisabled} next onClick={this.next}>Next &rarr;</PageItem>
        </Pager>
      </div>
    );
  }
});

export default BookCollection;



// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-0"><img src="https://img3.doubanio.com/mpic/s5860151.jpg"/></a>
// </li>
//
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-1"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
//
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-2"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
//
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-3"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
//
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-4"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
//
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-5"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-6"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
//
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-7"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
//
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-8"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
//
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-9"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-10"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
//
// <li className="col-sm-3">
//     <a className="thumbnail" id="carousel-selector-11"><img src="https://img3.doubanio.com/lpic/s5860151.jpg"/></a>
// </li>
