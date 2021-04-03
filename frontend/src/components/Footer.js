import React from 'react';

class Footer extends React.Component {
  render() {
    console.debug("rendering footer");
    return (
      <footer className = "footer page__section page__section_indent-size_s">
        <p className = "footer__copyright">&copy; 2020 Mesto Russia</p>
      </footer>
    )
  }
}

export default React.memo(Footer);