import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>FixDate</Logo>
        <Navigation>
          <NavLink href="#" active>Invitaciones</NavLink>
          <NavLink href="#">Categorías</NavLink>
          <NavLink href="#">Precios</NavLink>
          <NavLink href="#">Contacto</NavLink>
        </Navigation>
        <Actions>
          <SearchButton>
            <SearchIcon>🔍</SearchIcon>
          </SearchButton>
          <LoginButton>Iniciar Sesión</LoginButton>
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c5282;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${props => props.active ? '#2c5282' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: color 0.3s ease;

  &:hover {
    color: #2c5282;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
`;

const SearchIcon = styled.span`
  font-size: 1.2rem;
`;

const LoginButton = styled.button`
  background-color: #2c5282;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2d3748;
  }
`;

export default Header; 