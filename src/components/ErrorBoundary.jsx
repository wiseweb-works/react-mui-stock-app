import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error) {
    this.setState({
      error: error,
    });
  }

  render() {
    // Eğer bir hata olduysa istediğimiz bir UI döndürelim
    if (this.state.error) {
      return (
        <div>
          Bir hata oluştu:
          <pre>{this.state.error.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
