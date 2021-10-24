import React from 'react';
import ReactDOM from 'react-dom';

export const TareaNueva = React.forwardRef(function (props, ref) {
    const [isHidden, setIsHidden] = React.useState(true);
    const [value, setValue] = React.useState('');
    return (
      <React.Fragment>
        <input type='text' className={isHidden ? 'hidden' : 'input-new-task'} ref={ref} value={value} onChange={(e) => setValue(e.target.value)} />
        <button
          className={isHidden ? 'hidden' : 'btn btn-short-add'}
          onClick={() => {
            props.onClick();
            setValue('');
            }}>+</button>
        <button
          className={isHidden ? 'btn btn-large-add' : 'hidden'}
          onClick={() => {
            setIsHidden(!isHidden);

          } }>+ Nueva tarea</button>
      </React.Fragment>
    );
  })

export function ListaTareas() {
  const [lista, setLista] = React.useState([]);
  const input = React.useRef();

  return (
    <React.Fragment>
      <div className='lista-tareas'>
        <ul>
          {lista.map((item, i) => {
            return <Tarea 
                      contenido={item}
                      key={i}
                      onClick={() => {
                        const nuevaLista = [...lista];
                        const index = nuevaLista.indexOf(item);
                        nuevaLista.splice(index, 1)
                        console.log(lista)
                        setLista(nuevaLista);
                      }}
                    />
          })}
        </ul>
      </div>
      <div className='tarea-nueva'>
        <TareaNueva onClick={() => setLista([...lista, input.current.value])} ref={input}/>
      </div>
    </React.Fragment>
  )
}


export function Tarea(props) {
  const [isCompleted, setIsCompleted] = React.useState(false);
  return (
    <React.Fragment>
      <div className='wrap-item'>
        <input className="checktask" type='checkbox' onChange={() => setIsCompleted(!isCompleted)} /><br />
        <li className={isCompleted ? 'tarea tachado' : 'tarea'}>{props.contenido}</li>
        <button className={isCompleted ? 'delete' : 'delete hidden' } onClick={() => props.onClick()}><img className='icon' src="http://simpleicon.com/wp-content/uploads/trash.svg"/></button>
      </div>
    </React.Fragment>
  )

}

export function App(props) {
  return (
    <React.Fragment>
      <div className='container'>
        <div className='cabecera'>
          <h1 className='titulo'>{props.title}</h1>
        </div>
        <ListaTareas />
      </div>
    </React.Fragment>
  )
}



