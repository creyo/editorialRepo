import { useDrag } from "react-dnd";
import './FormPage.css'; 
function Card({ id, info}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
   console.log(isDragging)
  return (
   < >
    <div style={info.styles.class} ref={drag}>
        <div>
            <h3 style={info.styles.h3} >{info.name}</h3>
            <p style={info.styles.p}>{info.bio}</p>
        </div>
    </div>
   </>
  )
}

export default Card