import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface Props {
  value: number;
  text: string;
}

export function Rating({ value, text }: Props) {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i += 1) {
      if (value >= i) {
        stars.push(<FaStar key={i} />);
      } else if (value >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  return (
    <div className="rating">
      {renderStars().map((star) => (
        <span key={star.key}>{star}</span>
      ))}
      <span className="rating-text">{text && text}</span>
    </div>
  );
}

/* 
<span>
{value >= 1 ? (
  <FaStar />
) : value >= 0.5 ? (
  <FaStarHalfAlt />
) : (
  <FaRegStar />
)}
</span>
<span>
{value >= 2 ? (
  <FaStar />
) : value >= 1.5 ? (
  <FaStarHalfAlt />
) : (
  <FaRegStar />
)}
</span>
<span>
{value >= 3 ? (
  <FaStar />
) : value >= 2.5 ? (
  <FaStarHalfAlt />
) : (
  <FaRegStar />
)}
</span>
<span>
{value >= 4 ? (
  <FaStar />
) : value >= 3.5 ? (
  <FaStarHalfAlt />
) : (
  <FaRegStar />
)}
</span>
<span>
{value >= 5 ? (
  <FaStar />
) : value >= 4.5 ? (
  <FaStarHalfAlt />
) : (
  <FaRegStar />
)}
</span> 
*/
