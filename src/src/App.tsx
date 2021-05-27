import React from 'react';
import styled from 'styled-components';
import ImageList from './components/ImageList';
import withDragContainer from './components/withDragContainer';

const DragImageList = withDragContainer(ImageList);

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #123d5b;
  font-weight: 500;
  line-height: 1.2;
  font-family: 'sans-serif';
  text-transform: uppercase;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title>
          Moving motivators
        </Title>        
      </header>
      <section>
        <Container>
          <DragImageList />
        </Container>
      </section>
      <footer>
      </footer>
    </div>
  );
}

export default App;
