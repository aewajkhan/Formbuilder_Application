import './Button.css'

const Button = ({title,onClick,color,bgcolor,top,right}) => {
  
  return (
    <div className='btnContainer' style={{backgroundColor:bgcolor ,marginTop:top,marginRight:right}} onClick={onClick}>
          <h5 style={{color:color}}>{ title}</h5>
    </div>
  )
}

export default Button
