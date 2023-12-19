import Card from "./Card";
import { useDrop } from "react-dnd";
import { useState } from "react";
import Card2 from "./Card2";
import ReactQuill from 'react-quill';
function DragDrop({Items, setBody, body,setItems}) {
  const [board, setBoard] = useState([]);
  const [textBodies, setTextBodies] = useState({});
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["card", "card2", "text-editor"], 
    drop: (item) => addItemToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  function convertStylesToInline(styles) {
    const styleString = Object.entries(styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}:${value}`)
      .join('; ');
  
    return `'${styleString}'`;
  }


  const getCardHTML = (info, type) => {

    if(type === 'card'){
      let ret_string =  `
      <div style=${convertStylesToInline(info.styles.class)} ref={drag}>
      <div>
          <h3  style=${convertStylesToInline(info.styles.h3)}>${info.name}</h3>
          <p  style=${convertStylesToInline(info.styles.p)}> ${info.bio}</p>
      </div>
      <div>
          <img src=${info.image} alt=""/>
      </div>`
      return ret_string.replace(/\n/g, '')
    } else{
      let ret_string =   `<div  style=${convertStylesToInline(info.styles.class)} ref={drag}> 
      <img src=${info.img_url} alt="" />
              <h3  style=${convertStylesToInline(info.styles.h3)}>${info.name}</h3>
              <p  style=${convertStylesToInline(info.styles.p)}>${info.bio}</p>
              <a href="/"  style=${convertStylesToInline(info.styles.a)}>Try for free</a>   
      </div>`
      return ret_string.replace(/\n/g, '')
    } 
  }
  const handleCard = (id) => {
    console.log(id)
  }
  const addItemToBoard = (id) => {
    const item = Items.find((item) => item.id === id);
    if (item.type === "card") {
      const cardHTML = getCardHTML(item.info, 'card');
      setBody((prevBody) => `${prevBody}<br/>${cardHTML}`);
      setBoard((prevBoard) => [...prevBoard, item]);
    } else if (item.type === "text-editor") {
      const newItem = {
        id: `new_${Date.now()}`, // Generate a unique ID
        type: 'text-editor',
        text: "", 
        info: {
          name: "Text-Editor",
          bio: ""
        } // You can initialize the text as needed
      };
  
      // Update the Items object with the new item
      setItems((prevItems) => ({ ...prevItems, [newItem.id]: newItem }));
  
      setTextBodies((prevTextBodies) => ({
        ...prevTextBodies,
        [newItem.id]: newItem.text || '', // Use the item.id as the key
      }));
      
      setBoard((prevBoard) => [...prevBoard, newItem]);
    }else if (item.type === "card2"){
      const cardHTML = getCardHTML(item.info, 'card2');
      setBody((prevBody) => `${prevBody}<br/>${cardHTML}`);
      setBoard((prevBoard) => [...prevBoard, item]);
    } 
  };
  
  
  const TextEditorModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const TextEditorFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];
  // const handleTextChange = (content) => {
  //   // let text = Items.find((item) => item.id === id).text = content;
  //   setTextBody(content);
  //   setBody(textBody)
  // }

  const handleTextChange = (content, itemId) => {
    // Update the text body state for the specific item id
    setTextBodies((prevTextBodies) => ({
      ...prevTextBodies,
      [itemId]: content,
    }));

    // setBody(content)
  };

  const saveText = (itemId) => { 
    const text = textBodies[itemId];
    setBody((prevBody) => `${prevBody}\n${text}`);
  }
  return (
    <>
      <div ref={drop} className='board'>
      {board.map((item) => (
    item.type === "card" ? (
      <div onClick={()=> handleCard(item.info)}>
      <Card info={item.info} id={item.id} key={item.id}/>
      </div>
    ) : 
    item.type === "card2" ? (
      <Card2 info={item.info} id={item.id} key={item.id} />
    ) :
    (
      <ReactQuill
      value={textBodies[item.id] || ''}
      onChange={(content) => handleTextChange(content, item.id)}
      onBlur={() => saveText(item.id)}
      placeholder="Enter your text here..."
      modules={TextEditorModules}
      formats={TextEditorFormats}
      style={{ height: '300px', marginBottom: '100px', width: '1040px' }}
    />
    ) 

  ))}
      </div>
 
    </>
  );
}

export default DragDrop;
