import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause } from 'react-icons/fa';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerContainer>
      <PlayerButton onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </PlayerButton>
      <PlayerText>Nuestra Canción</PlayerText>
      <audio
        ref={audioRef}
        src="/cancion.mp3"
        loop
      />
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.white};
  padding: 12px 24px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border: 1px solid ${({ theme }) => theme.colors.sage.light};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const PlayerButton = styled.button`
  background: ${({ theme }) => theme.colors.sage.main};
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    transform: scale(1.05);
  }
`;

const PlayerText = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  color: ${({ theme }) => theme.colors.sage.main};
  font-size: 0.9rem;
  font-weight: 500;
`;

export default MusicPlayer; 