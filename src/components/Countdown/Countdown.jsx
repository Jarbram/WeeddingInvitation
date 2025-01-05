import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const targetDate = new Date('2025-08-23T00:00:00').getTime();
  const calendarEvent = {
    title: "Boda Elena & Josué",
    description: "¡Nos casamos! Acompáñanos en este día tan especial.",
    location: "Hotel Real, Calle Las Flores 456, Lima",
    startDate: "2025-08-23T17:00:00",
    endDate: "2025-08-24T03:00:00"
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const generateCalendarUrl = () => {
    const event = {
      text: calendarEvent.title,
      details: calendarEvent.description,
      location: calendarEvent.location,
      dates: `${calendarEvent.startDate}/${calendarEvent.endDate}`
    };

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&dates=${encodeURIComponent(event.dates.replace(/[-:]/g, ''))}`;
  };

  return (
    <CountdownContainer>
      <ContentWrapper
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <CountdownTitle>Nuestra Cuenta Regresiva</CountdownTitle>
        <CountdownSubtitle>Cada segundo nos acerca a nuestro gran día</CountdownSubtitle>
        
        <CountdownWrapper>
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <TimeUnit
              key={unit}
              as={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <NumberWrapper>
                <AnimatePresence mode="wait">
                  <Number
                    as={motion.span}
                    key={value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {value.toString().padStart(2, '0')}
                  </Number>
                </AnimatePresence>
              </NumberWrapper>
              <Label>{unit}</Label>
            </TimeUnit>
          ))}
        </CountdownWrapper>

        <AddToCalendarButton
          href={generateCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          as={motion.a}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CalendarIcon>📅</CalendarIcon>
          Agregar a Calendario
        </AddToCalendarButton>
      </ContentWrapper>
    </CountdownContainer>
  );
};

const CountdownContainer = styled.section`
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
  background-color: #fff;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 3rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const CountdownTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.primary.dark};
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const CountdownSubtitle = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  color: ${props => props.theme.colors.sage[600]};
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  font-weight: 300;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const CountdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: space-around;
    
    // Asegura que siempre haya 2 elementos por fila en móvil
    & > div {
      flex: 0 0 calc(50% - 1rem);
      margin-bottom: 1rem;
    }
  }
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const NumberWrapper = styled.div`
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(212, 176, 140, 0.1);
  position: relative;
  overflow: hidden;
  width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem 1.5rem;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, ${props => props.theme.colors.primary.light}, ${props => props.theme.colors.primary.main});
    opacity: 0.5;
  }
`;

const Number = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 3rem;
  color: #1a1a1a;
  font-weight: 300;
  display: block;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Label = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
`;

const AddToCalendarButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #1a1a1a;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  border: 1px solid ${props => props.theme.colors.primary.main};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 176, 140, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
  
  &:hover {
    background: ${props => props.theme.colors.primary.main};
    color: white;
  }
`;

const CalendarIcon = styled.span`
  font-size: 1.2rem;
`;

export default Countdown;