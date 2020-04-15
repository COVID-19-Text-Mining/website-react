import PropTypes from "prop-types";
import React from "react";

import { FacetValue } from "@elastic/react-search-ui-views/lib/types";
import {
  appendClassName,
  getFilterValueDisplay,
} from "@elastic/react-search-ui-views/lib/view-helpers";

function BetterMultiCheckboxFacet({
  className,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
  hiddenOptions,
  searchPlaceholder,
}) {
  return (
    <fieldset className={appendClassName("sui-facet", className)}>
      <legend className="sui-facet__title">{label}</legend>

      {showSearch && (
        <div className="sui-facet-search">
          <input
            className="sui-facet-search__text-input"
            type="search"
            placeholder={searchPlaceholder || "Search"}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        </div>
      )}

      <div className="sui-multi-checkbox-facet">
        {options.length < 1 && <div>No matching options</div>}
        {options.map((option) => {
          const checked = option.selected;
          //TODO: Right now this just excludes any value that matches, but it really should be the field:value pair
          if (!hiddenOptions.includes(option.value)) {
            return (
              <label
                key={`${getFilterValueDisplay(option.value)}`}
                htmlFor={`example_facet_${label}${getFilterValueDisplay(
                  option.value
                )}`}
                className="sui-multi-checkbox-facet__option-label"
              >
                <div className="sui-multi-checkbox-facet__option-input-wrapper">
                  <input
                    id={`example_facet_${label}${getFilterValueDisplay(
                      option.value
                    )}`}
                    type="checkbox"
                    className="sui-multi-checkbox-facet__checkbox"
                    checked={checked}
                    onChange={() =>
                      checked ? onRemove(option.value) : onSelect(option.value)
                    }
                  />
                  <span className="sui-multi-checkbox-facet__input-text">
                    {getFilterValueDisplay(option.value)}
                  </span>
                </div>
                <span className="sui-multi-checkbox-facet__option-count">
                  {option.count.toLocaleString("en")}
                </span>
              </label>
            );
          }
        })}
      </div>

      {showMore && (
        <button
          type="button"
          className="sui-facet-view-more"
          onClick={onMoreClick}
          aria-label="Show more options"
        >
          + More
        </button>
      )}
    </fieldset>
  );
}

BetterMultiCheckboxFacet.propTypes = {
  label: PropTypes.string.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(FacetValue).isRequired,
  showMore: PropTypes.bool.isRequired,
  className: PropTypes.string,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  hiddenOptions: PropTypes.arrayOf(PropTypes.string),
};

export default BetterMultiCheckboxFacet;
