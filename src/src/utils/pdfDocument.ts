import jsPDF from 'jspdf';
import { toDataURL }  from './image';

export const printDocument = async (images: any[]) => {        
    const pdf = new jsPDF({
      orientation: 'landscape',        
    });   
    pdf.setTextColor(18, 61, 91);
    pdf.setFontSize(30);
    let text = 'MOVING MOTIVATORS';
    var textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var textOffset = (pdf.internal.pageSize.width - textWidth) / 2;      
    pdf.text(text, textOffset, 20);
    let x = 0;
    let y = 0;
    let count = 0;
    for(let image of images){        
      let img = await toDataURL(image.src);
      pdf.addImage(img, 'JPEG', x + 10, y + 30, 50, 50);
      count++;
      if (count === 5){
        x = 0;
        y += 60;
      }
      else
        x += 55;
    }
    pdf.save("moving-motivators.pdf");      
  }