import React from 'react';
import MillieButton from '../Components/MillieButton/MillieButton';
import ButtonBar from '../Components/ButtonBar/ButtonBar';
import QuickviewBox from '../Components/QuickviewBox/QuickviewBox';
import '../Components/Other.css';

function Folders(){
    const numbers = [1, 2, 3, 4, 5];

    return (
        <div>
            <h1>Saved Folders</h1>
            <ButtonBar className={'orange'}>
               <MillieButton className={'orange'}>New Folder</MillieButton> 
               <MillieButton className={'orange'}>Sort</MillieButton> 
            </ButtonBar>

            {/* turn what's below into a map function */}

            <div className={'groupDisplayLeft'}>
                <div className={'groupDisplayFlexWrap'}>
                    {numbers.map((item)=>{
                        return (
                            <QuickviewBox>
                                <h3>Folder1 Name</h3>
                                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                                <h5>10 Schools</h5>
                            </QuickviewBox>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Folders;