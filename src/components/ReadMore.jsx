import React from "react";
import PropTypes from "prop-types";
//
// React.createClass({
//   getInitialState: function () {
//     return { showMe: false };
//   },
//   onClick: function () {
//     this.setState({ showMe: true });
//   },
//   render: function () {
//     if (this.state.showMe) {
//       return <div> one div </div>;
//     } else {
//       return <a onClick={this.onClick}> press me </a>;
//     }
//   },
// });

class ReadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
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
          <div className="has-margin-right-60 has-margin-5">
            <span
              dangerouslySetInnerHTML={{ __html: this.props.short + "..." }}
              className="text-body is-size-6 "
            />
            <a
              className="a has-text-link has-margin-left-5"
              onClick={this.showMoreLess}
            >
              {"[+]"}
            </a>
          </div>
        );
      } else {
        return (
          <div className="has-margin-right-60 has-margin-5">
            <span
              dangerouslySetInnerHTML={{ __html: this.props.long }}
              className="text-body is-size-6"
            />
            <a
              className="a has-text-link has-margin-left-5"
              onClick={this.showMoreLess}
            >
              {"[-]"}
            </a>
          </div>
        );
      }
    } else {
      return <span />;
    }
  }
}

ReadMore.propTypes = {
  // more: PropTypes.string.isRequired,
  // less: PropTypes.string.isRequired,
  long: PropTypes.string.isRequired,
  short: PropTypes.string.isRequired,
};

export default ReadMore;
