export default function Product({ name, image, price }) {
  return (
    <div>
      <Image src={image} alt={name} />
      <h1>{name}</h1>
      {price}
    </div>
  );
}
