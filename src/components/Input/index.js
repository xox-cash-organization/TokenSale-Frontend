import styled from "styled-components";

export default styled.input`
  color: ${props => props.color || "black"};
  font-family: ${props => props.fontFamily || "sans-serif"};
  font-size: ${props => props.fontSize || "13px"};
  padding: ${props => props.padding || "4px"};
  font-weight: ${props => props.fontWeight || "normal"};
  border: ${props => props.border || "1px solid gainsboro"};
  width: ${props => props.width || "100px"};
  border-radius: ${props => props.borderRadius || "0px"};

  @media screen and (max-width: 360px) {
    width: ${props => props.mobileWidth || props.width || "100px"};
    padding: ${props => props.mobilePadding || props.padding || "4px"};
  }
`;
