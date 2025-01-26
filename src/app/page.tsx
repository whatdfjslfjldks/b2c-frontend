'use client'
import BottomComponent from '@/components/bottom/bottomComponent';
import FloatMenuComponent from '@/components/float/floatMenuComponent';
import NavComponent from '@/components/header/navComponent';
import TopSectionComponent from '@/components/header/topSectionComponent';
import SliderComponent from '@/components/homePage/sliderComponent';
import { Suspense, lazy } from 'react';

const SecKillComponent = lazy(() => import('@/components/homePage/secKillComponent'));
const FeaturedRecComponent = lazy(() => import('@/components/homePage/featuredRecComponent'));
const ExLaunchComponent = lazy(() => import('@/components/homePage/exlaunchComponent'));
const ProductList = lazy(() => import('@/components/homePage/productList'));

export default function Home() {
  return (
    <div>
        
        {/* 使用Suspense包裹懒加载组件 */}

          <SliderComponent />
        
        <Suspense fallback={<div>加载中...</div>}>
          <SecKillComponent />
        </Suspense>

        <Suspense fallback={<div>加载中...</div>}>
          <FeaturedRecComponent />
        </Suspense>

        <Suspense fallback={<div>加载中...</div>}>
          <ExLaunchComponent />
        </Suspense>

        <Suspense fallback={<div>加载中...</div>}>
          <ProductList />
        </Suspense>
      </div>

  );
}
