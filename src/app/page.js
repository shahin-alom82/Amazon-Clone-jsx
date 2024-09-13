"use client"
import CarouselBanner from '@/components/CarouselBanner';
import ProductList from '@/components/ProductList';
import { fetchData } from '@/hooks';
import React from 'react';

const HomepPage = async () => {

  const endpoint = "https://dummyjson.com/products";
  const { products } = await fetchData(endpoint);

  return (
    <div>
      <CarouselBanner />
      <div className=''>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default HomepPage