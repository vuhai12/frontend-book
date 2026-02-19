import styled from "styled-components";
import banner from "../../assets/AboutUs/banner.jpg";

export const Div = styled.div`
  background-image: url(${banner});
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: black;
    z-index: 1;
    opacity: 0.65;
  }
`;
