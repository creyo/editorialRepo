import { useDrag } from "react-dnd";
import './FormPage.css'; 

function Card2({id, info}) {
    const [ drag] = useDrag(() => ({
        type: "card2",
        item: { id: id },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
  return (
    < >
    <div style={info.styles.class} ref={drag}> 
    <img src={info.img_url} alt="" />
            <h3 style={info.styles.h3} contentEditable>{info.name}</h3>
            <p style={info.styles.p}contentEditable>{info.bio}</p>
            <a href="/" style={info.styles.a}contentEditable>Try for free</a>
         
    </div>
   </>
  )
}

export default Card2