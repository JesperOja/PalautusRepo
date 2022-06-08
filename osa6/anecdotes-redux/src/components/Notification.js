import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = () =>{
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if(props.notification[props.notification.length -1].show){
      return (
              <div style={style}>
                {props.notification[props.notification.length -1].message}
                </div>
            )
      }
        return(<></>)
  }
  
  return (
    < >
    {notification()}
    </>)
}

const mapStateToProps = state => {
  return{
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)