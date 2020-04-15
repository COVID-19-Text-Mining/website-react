import React from "react";
import PropTypes from "prop-types";
import "./ReadMore.css";

class ReadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  showMoreLess = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    if (this.props.long && this.props.long.length > 0) {
      if (!this.state.expanded) {
        return (
          <div className="my-1 ml-1 mr-5">
            <span
              dangerouslySetInnerHTML={{__html: this.props.short + "..."}}/>
            <span
              className="read-more btn btn-sm btn-link"
              onClick={this.showMoreLess}
              onTouchStart={this.showMoreLess}>
              {"[+]"}
            </span>
          </div>
        );
      } else {
        return (
          <div className="my-1 ml-1 mr-5">
            <span
              dangerouslySetInnerHTML={{__html: this.props.long}}/>
            <span
              className="read-more btn btn-sm btn-link"
              onClick={this.showMoreLess}
              onTouchStart={this.showMoreLess}>
              {"[-]"}
            </span>
          </div>
        );
      }
    } else {
      return <span/>;
    }
  }
}

ReadMore.propTypes = {
  long: PropTypes.string.isRequired,
  short: PropTypes.string.isRequired,
};

export default ReadMore;
