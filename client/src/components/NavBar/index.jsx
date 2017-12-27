import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../particles/Navbar/NavBar.css';

export const NavItem = props => (
  <div onClick={props.onClick} role="button" className="sp-nav-item inline-blk" style={props.style}>
    <h3>{props.children}</h3>
  </div>
);

NavItem.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.instanceOf(Object),
  children: PropTypes.node,
};

NavItem.defaultProps = {
  onClick: null,
  style: {},
  label: null,
  children: null,
};

export const NavDivider = () => (
  <div className="sp-nav-divider">
    <h1>|</h1>
  </div>
);

export const NavGroup = props => (
  <section className={`sp-flex-align-${props.align}`}>{props.children}</section>
);

NavGroup.propTypes = {
  align: PropTypes.oneOf(['right', 'center', 'left']),
  children: PropTypes.node,
};

NavGroup.defaultProps = {
  align: 'center',
  children: null,
};

export const NavBarView = props => (
  <header className="sp-navbar-container">
    <section className="sp-navbar sp-flex-align-center">
      <NavGroup key="left-nav" align={'left'}>
        <h3>Surfline Project</h3>
      </NavGroup>
      <NavGroup key="right-nav" align={'right'}>
        {props.children}
      </NavGroup>
    </section>
  </header>
);

NavBarView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

NavBarView.defaultProps = {
  children: null,
};
