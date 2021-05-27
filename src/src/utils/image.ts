
export function toDataURL(url: string) : Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = () => {        
          resolve(reader.result);
        }
        reader.onerror = () =>{
          reject(reader.error);
        }
        reader.readAsDataURL(xhr.response);
      };    
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    })  
  }