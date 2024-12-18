import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import useModalStore from '../../store/useModalStore';
import ModalRenderer from './ModalRenderer';
import ModalShell from './ModalShell';

vi.mock('@/components/Modals/ModalTest', () => ({
  __esModule: true,
  default: ({ closeModal }: { closeModal: () => void }) => (
    <ModalShell closeModal={closeModal}>
      <h2 className="text-xl font-bold">모달 테스트</h2>
      <p className="mt-4">모달 테스트의 내용입니다.</p>
      <button
        onClick={closeModal}
        className="mt-6 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-600"
      >
        닫기
      </button>
    </ModalShell>
  ),
}));

describe('모달 동작 테스트', () => {
  beforeEach(() => {
    document.body.style.overflow = 'auto';
  });

  afterEach(() => {
    useModalStore.setState({ activeModal: null, isOpen: false });
    document.body.style.overflow = 'auto';
  });

  it('1-1) 모달을 열고, 모달 제목이 올바르게 표시되는지 확인한다.', async () => {
    const { openModal } = useModalStore.getState();

    act(() => {
      openModal('ModalTest');
    });

    act(() => {
      render(<ModalRenderer />);
    });

    waitFor(() => {
      expect(screen.getByText('모달 테스트')).toBeInTheDocument();
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('1-2) 모달을 열고, 모달 내용이 올바르게 표시되는지 확인한다.', async () => {
    const { openModal } = useModalStore.getState();

    act(() => {
      openModal('ModalTest');
    });

    act(() => {
      render(<ModalRenderer />);
    });

    waitFor(() => {
      expect(screen.getByText('모달 테스트의 내용입니다.')).toBeInTheDocument();
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('2) 모달이 열려있는 상태에서 모달이 올바르게 닫히는지 확인한다.', async () => {
    const { openModal } = useModalStore.getState();
    act(() => {
      openModal('ModalTest');
    });

    act(() => {
      render(<ModalRenderer />);
    });
    await screen.findByText('닫기');

    act(() => {
      fireEvent.click(screen.getByText('닫기'));
    });

    waitFor(() => {
      expect(screen.queryByText('모달 테스트')).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe('auto');
    });
  });

  it('3) 모달을 열고 모달의 dimmer 기능이 정상 동작하는 지 확인한다.', async () => {
    const { openModal } = useModalStore.getState();
    act(() => {
      openModal('ModalTest');
      render(<ModalRenderer />);
    });
    await screen.findByText('모달 테스트');

    act(() => {
      fireEvent.mouseDown(screen.getByRole('dialog'));
    });

    waitFor(() => {
      expect(screen.queryByText('모달 테스트')).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe('auto');
    });
  });

  it('4) 모달을 열고 내부 영역을 클릭했을 때 dimmer가 동작하지 않는지 확인한다.', async () => {
    const { openModal } = useModalStore.getState();
    act(() => {
      openModal('ModalTest');
      render(<ModalRenderer />);
    });
    await screen.findByText('모달 테스트');

    act(() => {
      fireEvent.mouseDown(screen.getByText('모달 테스트'));
    });

    waitFor(() => {
      expect(screen.getByText('모달 테스트')).toBeInTheDocument();
      expect(document.body.style.overflow).toBe('hidden');
    });
  });
});
