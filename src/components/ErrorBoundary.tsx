import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App render error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-gray-900">
          <h1 className="text-xl font-bold mb-2">Sahifa yuklanmadi</h1>
          <p className="text-sm text-gray-600 mb-4 max-w-lg text-center">
            {this.state.error.message}
          </p>
          <button
            type="button"
            className="px-4 py-2 bg-[#0085d4] text-white rounded"
            onClick={() => window.location.reload()}
          >
            Qayta yuklash
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
