import { products } from '@/data/products';
import { ProductDetailView } from './ProductDetailView';

export function generateStaticParams() {
  return products.map((prod) => ({
    id: prod.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailView id={id} />;
}
