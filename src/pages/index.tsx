import { MainSlider } from '~/components/main-slider/main-slider';

import { MainLayout } from "~/layout/MainLayout/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <div className="app-container relative my-8 flex w-full justify-center">
        <MainSlider />
      </div>
    </MainLayout>
  );
}
