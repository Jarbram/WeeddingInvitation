import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    {
      id: 1,
      src: "/foto2.jpeg",
      alt: "Foto de Elena y Josué"
    },
    {
      id: 2,
      src: "/foto3.jpeg",
      alt: "Foto de Elena y Josué"
    },
    {
      id: 3,
      src: "/foto4.jpeg",
      alt: "Foto de Elena y Josué"
    },
    {
      id: 4,
      src: "/foto5.jpeg",
      alt: "Foto de Elena y Josué"
    },
    {
      id: 5,
      src: "/foto6.jpeg",
      alt: "Foto de Elena y Josué"
    },
    {
      id: 6,
      src: "/foto7.jpeg",
      alt: "Foto de Elena y Josué"
    }
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSlide('next'),
    onSwipedRight: () => handleSlide('prev'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleSlide = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;
    
    setCurrentIndex(newIndex);
    if (selectedImage) {
      setSelectedImage(images[newIndex]);
    }
  };

  const handleKeyPress = (e) => {
    if (selectedImage) {
      if (e.key === 'ArrowRight') handleSlide('next');
      if (e.key === 'ArrowLeft') handleSlide('prev');
      if (e.key === 'Escape') setSelectedImage(null);
    }
  };

  return (
    <GalleryContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader>
            <SectionTitle>Nuestros Momentos Especiales</SectionTitle>
            <SectionSubtitle>Un vistazo a nuestra historia de amor</SectionSubtitle>
          </SectionHeader>
          
          <SliderContainer {...handlers}>
            <SliderTrack
              as={motion.div}
              animate={{ x: -currentIndex * 100 + '%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {images.map((image, index) => (
                <SlideItem
                  key={image.id}
                  onClick={() => {
                    setSelectedImage(image);
                    setCurrentIndex(index);
                  }}
                >
                  <SlideImage
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                  <SlideOverlay>
                    <ViewButtonIcon>🔍</ViewButtonIcon>
                  </SlideOverlay>
                </SlideItem>
              ))}
            </SliderTrack>

            <SliderButton 
              left 
              onClick={() => handleSlide('prev')}
              aria-label="Foto anterior"
            >
              ‹
            </SliderButton>
            <SliderButton 
              right 
              onClick={() => handleSlide('next')}
              aria-label="Siguiente foto"
            >
              ›
            </SliderButton>

            <ProgressBar>
              <ProgressIndicator style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }} />
            </ProgressBar>
          </SliderContainer>
        </motion.div>
      </ContentWrapper>

      <AnimatePresence>
        {selectedImage && (
          <Modal
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={handleKeyPress}
            tabIndex="0"
          >
            <ModalOverlay onClick={() => setSelectedImage(null)} />
            <ModalContent>
              <CloseButton 
                onClick={() => setSelectedImage(null)}
                aria-label="Cerrar galería"
              >
                ×
              </CloseButton>
              <ModalImageWrapper>
                <ModalImage
                  as={motion.img}
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isZoomed ? 1.5 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => setIsZoomed(!isZoomed)}
                  style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
                />
              </ModalImageWrapper>
              <ModalControls>
                <ControlButton 
                  onClick={() => handleSlide('prev')}
                  disabled={currentIndex === 0}
                >
                  ‹
                </ControlButton>
                <ImageCounter>
                  {currentIndex + 1} / {images.length}
                </ImageCounter>
                <ControlButton 
                  onClick={() => handleSlide('next')}
                  disabled={currentIndex === images.length - 1}
                >
                  ›
                </ControlButton>
              </ModalControls>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

const GalleryContainer = styled.section`
  padding: 4rem 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  border-radius: 20px;
  width: 95%;
  max-width: 1400px;

  @media (max-width: 768px) {
    padding: 2rem 0;
    margin: 1rem auto;
  }
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const SectionHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.sage.main};
  font-size: 2rem;
  margin-bottom: 0.5rem;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: ${props => props.theme.colors.primary.main};
    margin: 0.5rem auto;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 2rem;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(117, 135, 95, 0.15);
  background: ${props => props.theme.colors.sage.light};
  aspect-ratio: 16/9;

  @media (max-width: 768px) {
    border-radius: 8px;
    aspect-ratio: 4/3;
  }
`;

const SliderTrack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const SlideItem = styled.div`
  flex: 0 0 100%;
  position: relative;
  height: 100%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const SlideOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(117, 135, 95, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${SlideItem}:hover & {
    opacity: 1;
  }
`;

const ViewButtonIcon = styled.span`
  font-size: 1.5rem;
  color: white;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.left ? 'left: 0.5rem;' : 'right: 0.5rem;'}
  background: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.sage.main};

  &:hover {
    background: ${({ theme }) => theme.colors.sage.main};
    color: ${({ theme }) => theme.colors.white};
  }

  ${SliderContainer}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    font-size: 1.2rem;
    opacity: 1;
    background: ${({ theme }) => theme.colors.white};
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(228, 198, 170, 0.3);
`;

const ProgressIndicator = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primary.main};
  transition: width 0.3s ease;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  z-index: 1001;
`;

const ModalImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -2.5rem;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
`;

const ModalControls = styled.div`
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.sage.main};
  padding: 0.5rem 1rem;
  border-radius: 20px;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  padding: 0 0.5rem;
  opacity: ${props => props.disabled ? 0.5 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const ImageCounter = styled.div`
  color: white;
  font-size: 0.9rem;
  min-width: 3rem;
  text-align: center;
`;

export default Gallery; 