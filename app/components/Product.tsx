import Image from 'next/image';
import formatPrice from '@/util/PriceFormat';
import { ProductType } from '@/types/ProductsType';
import Link from 'next/link';

export default function Product({ name, image, price, id }: ProductType) {
  return (
    <Link href={`/product/${id}`}>
      <div className="text-gray-700">
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full h-80 object-cover rounded-lg"
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700">
            {price && formatPrice(price)}
          </h2>
        </div>
      </div>
    </Link>
  );
}
