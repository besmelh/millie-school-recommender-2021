import Box from '@material-ui/core/Box';
import './LargeContainer.css';

function LargeContainer(props){
    return (
        <div className={props.className}>
            <Box className={'LargeContainer'}>
                {props.children}
            </Box>  
        </div>
    )
}

export default LargeContainer;