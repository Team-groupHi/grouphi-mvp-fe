import Link from 'next/link';

import { Button, Footer, Logo, MainHeader } from '@/components';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex flex-col items-center flex-grow w-full px-8 text-white">
        <div className="flex flex-col w-full max-w-4xl gap-4 mt-10">
          <section className="p-8 text-center rounded-lg">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <h1 className="mb-2 text-4xl italic font-bold">
              Hi, 그루파이 한 판, 거리는 한 뼘 👋
            </h1>
            <p className="text-xl text-gray-100">
              팀워크를 위한 가장 즐거운 시작
            </p>
          </section>

          <section className="p-8 text-center rounded-lg">
            <h2 className="mb-6 text-3xl font-bold">Our Story & Mission 🚀</h2>
            <div className="space-y-6 text-lg text-gray-100 leading-relaxed">
              <p>
                안녕하세요! 저희는 즐거운 소통과 유대감 형성이
                <br className="hidden sm:block" />
                성공적인 팀워크의 핵심이라고 믿는 &apos;팀 그루파이&apos;입니다.
                👨‍👩‍👧‍👦
              </p>
              <p>
                그루파이는 아이스브레이킹 게임을 통해
                <br className="hidden sm:block" />
                팀원들과 더 가깝고 친밀한 관계를 맺도록 돕는 서비스입니다. 🤝
                <br />
                어색한 침묵은 깨고, 모두가 하나 되는 즐거운 순간을 만들어보세요!
              </p>
              <p>
                그루파이가 여러분의 팀을
                <br className="hidden sm:block" />더 단단하고 유쾌한 팀으로
                만들어 드릴게요. ✨
              </p>
            </div>
          </section>

          <section className="p-8 text-center rounded-lg">
            <h2 className="mb-4 text-2xl font-bold">
              지금 바로 그루파이를 경험해보세요! 🎉
            </h2>
            <Link
              href="/"
              passHref
            >
              <Button
                size="lg"
                className="mt-4"
              >
                게임 시작하기
              </Button>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
