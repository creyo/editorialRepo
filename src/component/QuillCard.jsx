import { useDrag } from "react-dnd";
import './FormPage.css'; 
function QuillCard({ id, info}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
   < >
    <div className="author-info blog-component-card" ref={drag}>
        <div>
            <h3>{info.name}</h3>
            <p>{info.bio}</p>
        </div>
    </div>
   </>
  )
}

export default QuillCard