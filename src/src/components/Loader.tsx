import styled from "styled-components";

const Loader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-left: 4px solid;
  animation: load 1s infinite linear;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`

export default Loader;