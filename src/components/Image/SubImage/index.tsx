import { ReactElement, memo } from 'react';

interface Props {
  image: string;
  imageCount: number;
}

const SubImages: React.FC<Props> = ({ image, imageCount }): ReactElement => {
  const images = Array.from({ length: imageCount }, (_, id) => (
    <img key={id} src={image} alt={`Product Image ${id + 1}`} aria-hidden="true" />
  ));

  return <div className="product-images">{images}</div>;
};

export default memo(SubImages);
