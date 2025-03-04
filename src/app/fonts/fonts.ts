import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-sans',
});

const pretendard = localFont({
  src: './PretendardVariable.woff2', // 로컬 폰트 파일 경로 지정
  variable: '--font-pretendard', // css 변수 설정
  weight: '45 920', // 가변 폰트의 굵기 범위 지정
  display: 'swap',
});

export { notoSans, pretendard };
