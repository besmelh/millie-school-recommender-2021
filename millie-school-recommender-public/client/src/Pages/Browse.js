import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
//import axios from 'axios';
import { axiosAPI } from '../Axios/axios';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import ButtonBar from '../Components/ButtonBar/ButtonBar';
import MillieMenu from '../Components/MillieMenu/MillieMenu';
import MainTable from '../Components/MainTable/MainTable';
import BarChart from '../Components/BarChart/BarChart';
import PieChart from '../Components/PieChart/PieChart';
import MillieSearchBar from '../Components/MillieSearchBar/MillieSearchBar';
import SearchBar from 'material-ui-search-bar';
import HorizontalLine from '../Components/HorizontalLine/HorizontalLine';
import {mainTableColumns} from '../HelperFiles/mainTableColumns.js'

import './Browse.css';
import '../Components/Other.css';
import {createColumns, top10Countries, numOfSchoolSources, convertToPieChartData} from '../HelperFiles/browseFunctions';


function Browse({filterQuery}){
 
    const {search} = useLocation(); //gets the queries in the search
    const [data, setData] = useState([]);
    const [queries, setQueries] =  useState(search);
    const [searchBarQuery, setSearchBarQuery] =  useState({value: ''});
    var columns = createColumns(mainTableColumns);


    useEffect(() => {    
        async function fetchData(){
            const request = await axiosAPI.get(`/schools-list/${queries}`);
            console.log('queries', queries);
            setData(request.data);
            return request;
        }

        fetchData();
    }, [queries]);


    const history = useHistory();

    function searchBar(query) {
        history.push(`/browse/?search=${query}`);
        history.go();
    }

  

    return (
        <div className={'BrowsePage'}>
            <h1>Browse Schools</h1>
            <ButtonBar>
                    <MillieMenu
                        label={'Advanced Options'}
                        menuItems={
                            [{onClickAction: 'handleClose', label:'Save to Folder'},
                            {onClickAction: 'handleClose', label:'Save to Folder'},
                            {onClickAction: 'handleClose', label:'Save to Folder'},
                        ]
                        }/>
            </ButtonBar>

            <Grid container className={'Content'}>
                <Grid item xs={3} className={'SideBar'}>
                    <h2>Statistics</h2>
                    <div className={'SideBarContent'}>

                        <div className={'ChartSection'} style={{height:'300px'}}>
                            <h3>Country</h3>
                            <BarChart 
                                data={top10Countries(data)}
                                keys={'count'} 
                                indexBy={'country'}
                                axisBottomLegend={'Country'}
                                axisLeftLegend={'Count'}
                            />                            
                        </div>

                        <div style={{}}>
                          <HorizontalLine/>
                        </div>

                        <div className={'ChartSection'} style={{height:'180px'}}>
                            <h3>Num. of Sources</h3>
                            <PieChart
                              data={convertToPieChartData(numOfSchoolSources(data), 'numOfSourcesFound', 'count')}
                            />
                        </div>
                    </div>
                </Grid>

                <Grid item xs className={'MainContent'}>
                    <SearchBar
                        className={'SearchBar'}
                        style={{boxShadow: 'none', borderRadius: '10px'}}
                        value={searchBarQuery.value}
                        onChange={(newValue) => setSearchBarQuery({ value: newValue})}
                        onRequestSearch={() => searchBar(searchBarQuery.value)}
                    />


                    <MainTable 
                      rows={data} 
                      columns={columns} 
                    />
                    <p>Can’t find what you’re looking for? <a className={'inTextLink'}>Click here.</a></p>
                </Grid>
            </Grid>
        </div>
    );
}

export default Browse;



