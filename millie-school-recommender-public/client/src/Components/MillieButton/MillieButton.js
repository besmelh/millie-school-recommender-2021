import Button from '@material-ui/core/Button';
import './MillieButton.css';

function MillieButton(props){
    const {className, children, onClick, ...otherProps} = props;

    return (
        <div className={`MillieButtonDiv  ${className}`} {...otherProps}>
            <Button 
                className= {`MillieButton  ${className}`}
                variant="contained"
                onClick={props.onClick}
                >
                {children}
            </Button> 
        </div> 
    )
}

export default MillieButton;