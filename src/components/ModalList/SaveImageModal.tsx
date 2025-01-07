import Image from 'next/image';
import { Button } from '@/components/Button';
import ModalShell from '../Modal/ModalShell';
import { saveAs } from 'file-saver';
import { useToast } from '@/hooks/useToast';

interface SaveImageModalProps {
  closeModal: () => void;
  optionPropsNumber: number | string;
}

const SaveImageModal = ({
  closeModal,
  optionPropsNumber,
}: SaveImageModalProps) => {
  const imageUrl = optionPropsNumber.toString();

  const { toast } = useToast();

  const handleSaveImage = () => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, 'resultImage.png');
      })
      .catch(() => {
        toast({
          title: '사진 저장에 실패했어요! 다시 시도해주세요.',
          duration: 2000,
          variant: 'destructive',
        });
      });
  };

  return (
    <ModalShell closeModal={closeModal}>
      <section className="flex flex-col">
        <Image
          src={imageUrl}
          alt="resultImage"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} // optional
        />
        <Button onClick={handleSaveImage}>저장하기</Button>
      </section>
    </ModalShell>
  );
};

export default SaveImageModal;
