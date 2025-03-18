import { saveAs } from 'file-saver';
import { Save } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/Button';
import { useToast } from '@/hooks/useToast';

import Label from '../Label';
import ModalShell from '../Modal/ModalShell';

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

  const handleSaveImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      saveAs(blob, 'resultImage.png');
    } catch {
      toast({
        title: '사진 저장에 실패했어요! 다시 시도해주세요.',
        duration: 2000,
        variant: 'destructive',
      });
    }
  };

  return (
    <ModalShell closeModal={closeModal}>
      <section className="flex flex-col justify-center items-center gap-4">
        <Label>캡쳐 완료 ✅</Label>
        <Label>사진을 저장해 게임 결과를 공유해보세요!</Label>
        <Image
          src={imageUrl}
          alt="resultImage"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} // optional
        />
        <Button onClick={handleSaveImage}>
          <Save />
          사진 다운로드
        </Button>
      </section>
    </ModalShell>
  );
};

export default SaveImageModal;
