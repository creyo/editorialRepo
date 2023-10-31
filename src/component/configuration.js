

export function selectValue(length1,publication){
    let min = 0
    let max = 0
   console.log(min , max)
    if(publication === "1"){
       min = 40
       max = 60
    }else if(publication === "2"){
        min = 20
        max = 40
    }

  
 const isTitleValid = (length) => {
    if (length >= max) {
      return 'red';
    } else if (length >= min) {
      return 'green';
    }
    return '';
  };
   
 return  isTitleValid(length1)

}
  

export function selectField(publication){
     
 if(publication === "2"){
   return  false
 }
 return true
}