import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = ({ image, title, price, category }) => {
  return (
    <StyledCard
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <ImageContainer>
        <CardImage src={image} alt={title} />
        <Overlay>
          <Button>Ver Diseño</Button>
        </Overlay>
      </ImageContainer>
      <CardContent>
        <Title>{title}</Title>
        <Price>S/ {price}</Price>
        <Category>{category}</Category>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

const Button = styled.button`
  background: white;
  color: #333;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 16px;
  text-align: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
`;

const Price = styled.p`
  color: #2c5282;
  font-weight: 600;
  margin: 8px 0;
`;

const Category = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export default Card; 