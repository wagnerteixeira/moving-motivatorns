import React, { useState } from 'react'
import styled from 'styled-components';
import imageList from '../constants/imageList'
import withDragDropItem from './withDragItem';
import update from 'immutability-helper';
import { printDocument } from '../utils/pdfDocument';

interface ISourceImage {
  id: number,
  src: string,
  alt: string,
}

const Img = styled.img`
    height: 100%;
    width: 100%;
`

const ImageDraDrop = withDragDropItem(Img);

const DragDropContainer = styled.div`
    display: flex;
    justify-content: space-around;
    max-width: 80%;
    flex-wrap: wrap;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SaveButton = styled.button`
    background: #d3d3d3;
    color: #2c2c2c;
    cursor: pointer;
    font-size: 1.2em;
    padding: 0.5em;
    border: 0;
    transition: all 0.5s;
    border-radius: 8px;
    width: auto;
    position: relative;
    min-width: 5em;

    &:hover {
        background: #123d5b;
        transition: all 0.5s;
        border-radius: 10px;
        box-shadow: 0px 6px 15px #0000ff61;
        color: #ffffff;
        border: 0;        
    }

    &:focus {
      outline:0;
    }
`;

export default function ImageList() {

    const [images, setImages ] = useState(imageList as ISourceImage[]);   
    const [loading, setLoading] = useState(false);

    const moveImage = (dragIndex: number, hoverIndex: number) => {
        const draggedImage = images[dragIndex];
        
        const newImages= update(images, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
        })        
        setImages(
          newImages  
        );
    }    

    const handlePrint = async () => {
      if (loading)
        return
      setLoading(true);
      await printDocument(images);
      setLoading(false)
    }

    return (
        <Container>        
            <DragDropContainer>
                {images.map((value, index) => 
                    <ImageDraDrop 
                        key={index} 
                        src={value.src} 
                        alt={value.alt} 
                        dragId={value.id}
                        type='img'                         
                        index={index} 
                        moveDragItem={moveImage}
                        containerStyle={{ 
                            height:'19%',
                            width: '19%',
                            margin: 5,
                            borderRadius: 5,
                            boxShadow: '3px 3px 5px 2px #ccc'                            
                        }}
                    />)}                
            </DragDropContainer>        
           <ButtonContainer>
                    <SaveButton                       
                      onClick={handlePrint}
                    >{!loading ? 'Salvar' : 'Aguarde, gerando arquivo'}</SaveButton>
          </ButtonContainer>
        </Container>
    )
}
