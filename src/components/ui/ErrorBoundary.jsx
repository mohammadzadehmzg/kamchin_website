import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className="container section">
        <h1 className="h1">یک خطا رخ داد</h1>
        <p className="muted">
          یک بخش از صفحه خطا داد. صفحه را رفرش کنید.
        </p>
      </section>
    );
  }
}
