'use client';

import { AxiosError } from 'axios';
import { Component, ComponentType, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | AxiosError | null;
}

export interface FallbackProps {
  error: Error | AxiosError | null;
  resetErrorBoundary: () => void;
}

type ErrorBoundaryProps = {
  FallbackComponent: ComponentType<FallbackProps>;
  onReset: () => void;
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // 오류가 있는지 여부를 추적하는 상태 변수 정의
    this.state = { hasError: false, error: null };

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 다음 렌더링에서 폴백 UI를 표시하도록 상태 업데이트

    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 여기에서 자체 오류 로깅 서비스를 사용할 수 있습니다
    console.log({ error, errorInfo });
  }

  /** 에러 상태 기본 초기화 */
  resetErrorBoundary(): void {
    this.props.onReset();

    this.setState({
      hasError: false,
      error: null,
    });
  }

  render() {
    // 오류가 발생했는지 확인
    const { state, props } = this;

    const { hasError, error } = state;

    const { FallbackComponent, children } = props;

    if (hasError && error) {
      return (
        <FallbackComponent
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    // 오류가 없는 경우 자식 컴포넌트를 반환

    return children;
  }
}

export default ErrorBoundary;
