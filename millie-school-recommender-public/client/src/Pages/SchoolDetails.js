import React, {useState, useEffect} from 'react';
//import axios from 'axios';
import { axiosAPI } from '../Axios/axios';
import Box from '@material-ui/core/Box';
import { Grid, MenuItem } from '@material-ui/core';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import MillieMenu from '../Components/MillieMenu/MillieMenu';
import MillieButton from '../Components/MillieButton/MillieButton';
import ButtonBar from '../Components/ButtonBar/ButtonBar';
import LargeContainer from '../Components/LargeContainer/LargeContainer';
import '../Components/Other.css';
import './SchoolDetails.css';
import SchoolLogoDefault from '../Images/school_logo_default.svg';

import MainTable from '../Components/MainTable/MainTable';
import {useParams} from 'react-router-dom';
import {cleanFieldName} from '../HelperFiles/helperFunctions.js';
import { width } from '@material-ui/system';

function SchoolDetails(props){

    const relations = [
        { title: 'Status', detail: 'Engaged', subFields: []},
        { title: 'Average Tuition', detail: '7660', subFields: [] },
        { title: 'Curriculum', detail: 'English, AP', subFields: []},
        { title: 'Gradutes per year', detail: '100', subFields: []},
        { title: 'Marticulation', detail: '80%', 
        subFields: [
            {title: 'Average', detail:'80%' },
            {title: 'US', detail:'30%' },
            {title: 'UK', detail:'20%' },
            {title: 'CA', detail:'10%' },
            {title: 'Other', detail:'10%' },
        ]
         },
    ];

    const data_demo = {
        id: 'root',
        name: 'Parent',
        children: [
          {
            id: '1',
            name: 'Child - 1',
          },
          {
            id: '3',
            name: 'Child - 3',
            children: [
              {
                id: '4',
                name: 'Child - 4',
              },
            ],
          },
        ],
      };

    const renderTree = (nodes) => (
        <TreeItem key={nodes.title} nodeId={nodes.title} label={nodes.detail}>
          {Array.isArray(nodes.subFields) ? nodes.subFields.map((node) => renderTree(node)) : null}
        </TreeItem>
      );
    
    
    
    
    const {millie_code} = useParams();
    const [data, setData] = useState([]);
    const [contacts, setContacts] = useState([]);


    useEffect(() => {    
        async function fetchData(){
            const request = await axiosAPI.get(`/school-details/${millie_code}`);
            setData(request.data[0]);
            return request;
        }
        
        async function fetchContacts(){
            const request = await axiosAPI.get(`/school-details/${millie_code}/contacts`);
            setContacts(request.data);
            return request;
        }


        fetchData();
        fetchContacts();

    }, []);

    //from mini_master and master
    const generalFields = [
        'school_name',
        'country',
        'address',
        'city',
        'phone_number',
        'website',
        
        'millie_code',
        'primary_source', // sources organized this way to be later stacked on each other in webpage
        
        'parent_school',
        'secondary_source', // sources organized this way to be later stacked on each other in webpage

        'parent_website',
        'tertiary_source', // sources organized this way to be later stacked on each other in webpage
        
        'tuition_usd',
        'tuition_local',
        'tuition_comments',
    ]

    //from master_contacts
    const contactFields = [
        'full_name',
        'job_title',
        'email_address',
        'time_zone',
    ]

    const socialMedia_websites = [
        {shortcut: 'ig',
        fullname: 'Instagram'}, 
        {shortcut: 'fb',
        fullname: 'Facebook'}, 
        {shortcut: 'li',
        fullname: 'LinkedIn'}, 
    ]

    const socialMedia_details = [
        'social_x_followers',
        'social_x_link',
    ]


    //replace '_x_' in the originalText with the replacement
    // ex. replaceX('social_x_followers', ig) => 'social_ig_followers'
    function replaceX(originalText, xReplacement){
        let newText = originalText.replace('_x_', `_${xReplacement}_`);
        return newText;
    };

    // ex. cleanSocialMediaFieldTitles('social_x_followers') => 'social_followers'
    function removeEverythingBeforeX(text){
        text = text.substring(text.indexOf("_x_") + 3);
        return text;
    };


    return (
        <div>
            {console.log('data: ', data)}
            {console.log('contacts: ', contacts)}
            <div className={'schoolDetailsHeader'}>
                <div className={'logoAndTitle'}>
                    <Box className={'schoolLogoAndStatusDot'}>
                        <div className={'smallCircle'}></div>
                        <img src={SchoolLogoDefault} className={'schoolLogo'}/>
                    </Box>
                    <h1 className={'schoolName'}>{data['school_name']}</h1>
                </div>
                <ButtonBar>
                    <MillieButton className={'orange'}>Edit</MillieButton>
                    <MillieMenu
                        className={'orange'}
                        label={'Advanced Options'}
                        menuItems={
                            [{onClickAction: 'handleClose', label:'Save to Folder'},
                            {onClickAction: 'handleClose', label:'Save to Folder'},
                            {onClickAction: 'handleClose', label:'Save to Folder'},
                        ]
                        }/>
                        {/* <MenuItem onClick={handleClose}>Save to Folder</MenuItem>
                        <MenuItem onClick={handleClose}>Export as PDF</MenuItem>
                        <MenuItem onClick={handleClose}>Export as CSV</MenuItem>
                        <MenuItem onClick={handleClose}>Overwrite with CSV</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem> */}
                </ButtonBar>
            </div>

            <LargeContainer className={'schoolDetailsContainers'}>
                <h3>School Info</h3>
                <h4>General</h4>
                    <Grid container className={'schoolDetailsSection'}>
                        {generalFields.map((field)=>{

                        if (data[field]){
                            return(
                                <Grid container xs={5} className={'field poppins'}>
                                    <Grid xs={5} className={'fieldTitle'}>{cleanFieldName(field)}</Grid>
                                    <Grid xs className={'fieldDetails'}>{data[field]}</Grid>  
                                </Grid>
                            );
                        } else {
                            return(
                                <Grid container xs={5} className={'field poppins'}>
                                    <Grid xs={5} className={'fieldTitle'}>{cleanFieldName(field)}</Grid>
                                    <Grid xs className={'fieldDetails unknown'}>{'N/A'}</Grid>  
                                </Grid>
                            );
                        }
                        })}
                    </Grid>


                <h4>Relation with Millie</h4>
                    {/* <Grid container className={'schoolDetailsSection'}>
                        {relations.map((field, fieldNum)=>{
                                return(
                                    <Grid container xs={5} className={'field'}>
                                        <TreeView
                                            defaultCollapseIcon={<ExpandMoreIcon />}
                                            defaultExpandIcon={<ChevronRightIcon />}
                                            style={{width: "100%"}}>

                                            <TreeItem nodeId={fieldNum} label={
                                                <Grid container xs className={'field poppins'}>
                                                    <Grid item xs={4} className={'fieldTitle'}>{field.title}</Grid>
                                                    <Grid item xs className={'fieldDetails'}>{field.detail}</Grid> 
                                                </Grid>
                                            }>
                                                {field.subFields.map((subField, subFieldNum)=>{
                                                    return(
                                                        <TreeItem nodeId={1000 + subFieldNum} label={
                                                            <Grid container className={'field poppins'}>
                                                                <Grid item xs={4} className={'fieldTitle'}>{subField.title}</Grid>
                                                                <Grid item xs className={'fieldDetails'}>{subField.detail}</Grid> 
                                                            </Grid>
                                                        }>
                                                        </TreeItem>);
                                                    })}
                                            </TreeItem>  
                                        </TreeView>  
                                    </Grid>
                                
                                );
                            })}
                        </Grid>
                     */}
            </LargeContainer> 
                            

            <LargeContainer className={'schoolDetailsContainers'}>
                 <h3>Contact Points<span className={'numberOfElements'}>{contacts.length}</span></h3>
                   {contacts.map((contact)=>{
                        return(
                            <div>
                                <h4>{contact['preferred_name']}</h4>
                                <Grid container className={'schoolDetailsSection'}>
                                    {contactFields.map((field)=>{
                                        if (contact[field]){
                                            return(
                                                <Grid container xs={5} className={'field poppins'}>
                                                    <Grid item xs={5} className={'fieldTitle'}>{cleanFieldName(field)}</Grid>
                                                    <Grid item xs className={'fieldDetails'}>{contact[field]}</Grid>  
                                                </Grid>
                                            );
                                        } else {
                                            return(
                                                <Grid container xs={5} className={'field poppins'}>
                                                    <Grid item xs={5} className={'fieldTitle'}>{cleanFieldName(field)}</Grid>
                                                    <Grid item xs className={'fieldDetails unknown'}>{'N/A'}</Grid>  
                                                </Grid>
                                            );
                                        }
                                        })}
                                </Grid>
                            </div>
                        )
                    })}
            </LargeContainer>

            <LargeContainer className={'schoolDetailsContainers'}> 
                <h3>Student Info</h3>
                <h4>Total Students <span className={'numberOfElements'}>30</span></h4>
                {/* <MainTable/> */}
                <h4>Current Students <span className={'numberOfElements'}>30</span></h4>
            </LargeContainer>

            <Grid container spacing={3}>
                    {socialMedia_websites.map((website) => {
                        return (
                        <Grid item xs = {4}>
                            <LargeContainer className={'schoolDetailsContainers'}>
                                <a className={'logoAndTitle'} href={data[`social_${website.shortcut}_link`]} target={'_blank'}>
                                    <img src={require(`../Images/${website.shortcut}_icon.svg`).default} />
                                    <h4>{website.fullname}</h4>
                                </a>

                                <Grid container className={'schoolDetailsSection'}>
                                    {socialMedia_details.map((field)=>{

                                        //field name in the database
                                        let curWebsiteField_db = replaceX(field, website.shortcut);
                                        //how the field name will be viewed in the cell
                                        let curWebsiteField_readable = removeEverythingBeforeX(field);
                                        
                                        if (data[curWebsiteField_db]){
                                            console.log('link', curWebsiteField_readable)
                                            if (curWebsiteField_readable === 'link'){
                                                return(
                                                    <Grid container className={'field poppins'}>
                                                            <Grid item xs={5} className={'iconAndText fieldTitle'}>
                                                                <a href={data[`social_${website.shortcut}_link`]} target={'_blank'}>
                                                                    <img src={require(`../Images/hyperlink_icon.svg`).default} style={{width: 15, paddingRight: 3}}/>
                                                                    {cleanFieldName(curWebsiteField_readable)}
                                                                </a>
                                                            </Grid>   
                                                            <Grid item xs zeroMinWidth className={'fieldDetails'}>
                                                                <span style={{overflowWrap: 'break-word'}}>
                                                                    {data[curWebsiteField_db]}
                                                                </span>
                                                            </Grid>   
                                                        </Grid>
                                                );
                                            } else {
                                                return(
                                                    <Grid container className={'field poppins'}>
                                                        <Grid item xs={5} className={'fieldTitle'}>{cleanFieldName(curWebsiteField_readable)}</Grid>
                                                        <Grid item className={'fieldDetails'}>{data[curWebsiteField_db]}</Grid>  
                                                    </Grid>
                                                );
                                            }      
                                        } else {
                                            return(
                                                <Grid container className={'field poppins'}>
                                                    <Grid item xs={5} className={'fieldTitle'}>{cleanFieldName(curWebsiteField_readable)}</Grid>
                                                    <Grid item xs className={'fieldDetails unknown'} style={{width:'90%'}}>{'N/A'}</Grid>  
                                                </Grid>
                                            );
                                        }
                                    })}
                                </Grid>
                            </LargeContainer>
                        </Grid>
                        )
                        })}
                
            </Grid>

        </div>
    )
}

export default SchoolDetails;