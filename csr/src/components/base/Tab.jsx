import PropTypes from "prop-types";

function Tab({ items = [], onClick, selectedIndex = 0 }) {
  const handleClick = (index) => {
    onClick?.(index);
  };

  return (
    <ul className="tab">
      {items?.map((item, index) => {
        const selectedClassName = selectedIndex === index ? " selected" : "";
        const className = "tab-item" + selectedClassName;

        return (
          <li key={index} onClick={() => handleClick(index)}>
            <div className={className}>
              <h3>{item}</h3>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

Tab.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  selectedIndex: PropTypes.number,
};

export default Tab;
