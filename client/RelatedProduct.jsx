import "./index.css";
import ReactStars from "react-stars";
import Information from "./components/Information.jsx";
import React from "react";
import axios from "axios";
import api from "./api";
export default class RelatedProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      carousel: [],
      start: 0,
      end: 4,

    };
    this.next = this.next.bind(this);
    this.prev=this.prev.bind(this)
  }
  next() {
    const newstart = this.state.start + 1;
    const newend = this.state.end + 1;
    if (this.state.end < this.state.data.length ) {
      this.setState({
        start: newstart,
        end: newend,
        carousel: this.state.data.slice(newstart, newend),
      });
    }
  }
  prev() {
    const newstart = this.state.start - 1;
    const newend = this.state.end - 1;

    if (this.state.start >0) {
      this.setState({
        start: newstart,
        end: newend,
        carousel: this.state.data.slice(newstart, newend),
      });
    }
  }
  
  async componentDidMount() {
    let { start, end } = this.state;
    var id = window.location.href.split("/")[3];
    let data = await api(id);
    console.log(data);
    data.forEach(async (element, index)=> {
      let response = await axios
      .get(`http://localhost:3002/rating/${element.id}`)
        let ratings = response.data.ratings;
        let som = 0;
        let somval = 0;
        let ave;
        for (var keys in ratings) {
          som = som + Number(keys) * Number(ratings[keys]);
          somval = somval + Number(ratings[keys]);
        }
        ave = som / somval;
        element.rating = ave
        let carousel = data.slice(start,end);
    this.setState({ data,carousel });
  })
}
  
  render() {
    return (
      <div>
        <h1 className="ml-10 mt-12">RELATED PRODUCTS</h1>
        <div className="flex items-stretch p-3">
        <button onClick={this.prev}>
          <i className="fas fa-angle-left"></i>
        </button>
          {this.state.carousel.map((element, key) => (
            
            <Information key={key} data={element} />
         
          ))}
  
  
          <button onClick={this.next}>
            <i className="fas fa-angle-right" ></i>
          </button>
        </div>
        <h1 className="ml-10">YOUR OUTFIT</h1>
        <div className="card-related w-48 border-black border m-10">
          <img
            className="w-48 h-48 object-cover shadow-lg "
            src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(1276x366:1278x364)/origin-imgresizer.eurosport.com/2021/05/31/3143358-64422888-2560-1440.jpg"
          />
          <div className=" w-40 m-3 mt-70">
            <p className="text-xs">CATEGORY</p>
            <p className="font-bold">ROGER FEDERER</p>
            <p className="font-bold">THE weak era PLAYER</p>
            <p className="text-xs">$123</p>
            <ReactStars />
          </div>
        </div>
      </div> 
    );
  }
}
