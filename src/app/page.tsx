'use client'
import SliderComponent from '@/components/homePage/sliderComponent';
import MainLayout from '@/layouts/mainLayout';
import dynamic from 'next/dynamic';

const SecKillComponent = dynamic(() => import('@/components/homePage/secKillComponent'), { ssr: false });
const FeaturedRecComponent = dynamic(() => import('@/components/homePage/featuredRecComponent'), { ssr: false });
const ExLaunchComponent = dynamic(() => import('@/components/homePage/exlaunchComponent'), { ssr: false });
const ProductList = dynamic(() => import('@/components/homePage/productList'), { ssr: false });

export default function Home() {
  return (
    <div>
      <MainLayout>
        <div className="pl-[28px] pr-[28px]">
          <SliderComponent />
          <SecKillComponent />
          <FeaturedRecComponent />
          <ExLaunchComponent />
          <ProductList />
        </div>
      </MainLayout>
    </div>
  );
}
