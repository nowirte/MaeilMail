import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-width: 960px;
  max-width: 1920px;
  height: 100vh;
  padding: 1rem;
  gap: 1rem;
  box-sizing: border-box;
`;

const SideWrapper = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;
const Logo = styled.h1`
  height: 50px;
`;
const MyProfile = styled.div`
  height: 100px;
  background: #999;
  border-radius: 0.25rem;
`;
const Friends = styled.div`
  width: 100%;
  height: 100%;
  background: #666;
  border-radius: 0.25rem;
  overflow: scroll;
`;
const Footer = styled.footer`
  background: #999;
`;

export { Container, SideWrapper, Navbar, Logo, MyProfile, Friends, Footer };
