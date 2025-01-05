import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>FixDate</SectionTitle>
          <SectionText>
            Creamos invitaciones digitales personalizadas para tus eventos especiales.
          </SectionText>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Enlaces</SectionTitle>
          <FooterLink href="#">Inicio</FooterLink>
          <FooterLink href="#">Sobre Nosotros</FooterLink>
          <FooterLink href="#">Servicios</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Contacto</SectionTitle>
          <FooterLink href="mailto:info@fixdate.io">info@fixdate.io</FooterLink>
          <FooterLink href="tel:+51999999999">+51 999 999 999</FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Síguenos</SectionTitle>
          <SocialLinks>
            <SocialLink href="#">Facebook</SocialLink>
            <SocialLink href="#">Instagram</SocialLink>
            <SocialLink href="#">Twitter</SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      <Copyright>
        © {new Date().getFullYear()} FixDate. Todos los derechos reservados.
      </Copyright>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #2c5282;
  color: white;
  padding: 3rem 0 1rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  color: #e2e8f0;
  line-height: 1.6;
`;

const FooterLink = styled.a`
  color: #e2e8f0;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(FooterLink)`
  padding: 0.5rem;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  font-size: 0.9rem;
`;

export default Footer; 