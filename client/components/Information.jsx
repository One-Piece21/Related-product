import React from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
export default class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      url: "",
      view: "",
    };
  }

  render() {
    return (
      
      <div className="card-related w-48 border-black border m-10">
        {console.log(this.props.data)}
        <i className="far fa-star fav-icon"></i>

        <img
          className="w-48 h-48 object-cover shadow-lg "
          src={this.props.data.image}
        />
        <div className=" w-40 m-3 mt-70">
          <p className="text-xs">CATEGORY : {this.props.data.category}</p>
          <p className="font-bold">NAME : {this.props.data.name}</p>
          <p className="text-xs"> {this.props.data.default_price}$</p>
        </div>
        <p className="flex">
        { [...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <AiFillStar
              key={i}
                color={ratingValue > this.props.data.rating ? "grey" : "yellow"}
              />
            );
          })}
        </p>
      </div>
    );
  }
}
