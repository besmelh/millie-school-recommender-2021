import { cleanFieldName } from "./helperFunctions";
import Button from '@material-ui/core/Button';
import RelevanceBar from "../Components/RelevanceBar/RelevanceBar";



/**************** CODE TO RETRIEVE ALL THE SCHOOLS DATA ****************/
/* 
* material UI takes column names in the following format:
* 
* const columns = [
    { 
        field: 'School Name',
        headerName: 'School Name',
        width: 200,
        headerClassName: 'table-header' 
     },
 ];
*
* the function below takes an array containing the field name which will be 
* used as the 'field' and 'headerName', and also takes the width, like so:
*
* [{field: 'School Name', width: 200},...]
*
* This is done in order to easily customize the width of each column
*/


const renderDetailsButton = (params) => {
  return (
      <RelevanceBar
        relevance={params.row['relevance']}
        status={params.row['status']}
      />
  )
}


export function createColumns(objArrayColumnProperties){
    var thisColumns = [];
    objArrayColumnProperties.map(column => {

      var objArrColumn = {};
      objArrColumn['field'] = column['field_name_db'];
      objArrColumn['headerName'] = ((column['field_name_view'] === undefined) ? cleanFieldName(column['field_name_db']) : column['field_name_view']);
      objArrColumn['width'] = column['column_width'];
      objArrColumn['headerClassName'] = 'table-header';
      objArrColumn['renderCell'] = ((column['render_cell'] === 1) ? renderDetailsButton : undefined);

      thisColumns.push(objArrColumn);
    });



    return thisColumns;
  }

  


/**************** CALCULATING TOP 10 SCHOOLS ****************/
let nameCountries = {
  'Afghanistan' : 'AF',
  'Aland Islands' : 'AX',
  'Albania' : 'AL',
  'Algeria' : 'DZ',
  'American Samoa' : 'AS',
  'Andorra' : 'AD',
  'Angola' : 'AO',
  'Anguilla' : 'AI',
  'Antarctica' : 'AQ',
  'Antigua And Barbuda' : 'AG',
  'Argentina' : 'AR',
  'Armenia' : 'AM',
  'Aruba' : 'AW',
  'Australia' : 'AU',
  'Austria' : 'AT',
  'Azerbaijan' : 'AZ',
  'Bahamas' : 'BS',
  'Bahrain' : 'BH',
  'Bangladesh' : 'BD',
  'Barbados' : 'BB',
  'Belarus' : 'BY',
  'Belgium' : 'BE',
  'Belize' : 'BZ',
  'Benin' : 'BJ',
  'Bermuda' : 'BM',
  'Bhutan' : 'BT',
  'Bolivia' : 'BO',
  'Bosnia And Herzegovina' : 'BA',
  'Botswana' : 'BW',
  'Bouvet Island' : 'BV',
  'Brazil' : 'BR',
  'British Indian Ocean Territory' : 'IO',
  'Brunei Darussalam' : 'BN',
  'Bulgaria' : 'BG',
  'Burkina Faso' : 'BF',
  'Burundi' : 'BI',
  'Cambodia' : 'KH',
  'Cameroon' : 'CM',
  'Canada' : 'CA',
  'Cape Verde' : 'CV',
  'Cayman Islands' : 'KY',
  'Central African Republic' : 'CF',
  'Chad' : 'TD',
  'Chile' : 'CL',
  'China' : 'CN',
  'Christmas Island' : 'CX',
  'Cocos (Keeling) Islands' : 'CC',
  'Colombia' : 'CO',
  'Comoros' : 'KM',
  'Congo' : 'CG',
  'Congo, Democratic Republic' : 'CD',
  'Cook Islands' : 'CK',
  'Costa Rica' : 'CR',
  'Cote D\'Ivoire' : 'CI',
  'Croatia' : 'HR',
  'Cuba' : 'CU',
  'Cyprus' : 'CY',
  'Czech Republic' : 'CZ',
  'Denmark' : 'DK',
  'Djibouti' : 'DJ',
  'Dominica' : 'DM',
  'Dominican Republic' : 'DO',
  'Ecuador' : 'EC',
  'Egypt' : 'EG',
  'El Salvador' : 'SV',
  'Equatorial Guinea' : 'GQ',
  'Eritrea' : 'ER',
  'Estonia' : 'EE',
  'Ethiopia' : 'ET',
  'Falkland Islands (Malvinas)' : 'FK',
  'Faroe Islands' : 'FO',
  'Fiji' : 'FJ',
  'Finland' : 'FI',
  'France' : 'FR',
  'French Guiana' : 'GF',
  'French Polynesia' : 'PF',
  'French Southern Territories' : 'TF',
  'Gabon' : 'GA',
  'Gambia' : 'GM',
  'Georgia' : 'GE',
  'Germany' : 'DE',
  'Ghana' : 'GH',
  'Gibraltar' : 'GI',
  'Greece' : 'GR',
  'Greenland' : 'GL',
  'Grenada' : 'GD',
  'Guadeloupe' : 'GP',
  'Guam' : 'GU',
  'Guatemala' : 'GT',
  'Guernsey' : 'GG',
  'Guinea' : 'GN',
  'Guinea-Bissau' : 'GW',
  'Guyana' : 'GY',
  'Haiti' : 'HT',
  'Heard Island & Mcdonald Islands' : 'HM',
  'Holy See (Vatican City State)' : 'VA',
  'Honduras' : 'HN',
  'Hong Kong' : 'HK',
  'Hungary' : 'HU',
  'Iceland' : 'IS',
  'India' : 'IN',
  'Indonesia' : 'ID',
  'Iran, Islamic Republic Of' : 'IR',
  'Iraq' : 'IQ',
  'Ireland' : 'IE',
  'Isle Of Man' : 'IM',
  'Israel' : 'IL',
  'Italy' : 'IT',
  'Jamaica' : 'JM',
  'Japan' : 'JP',
  'Jersey' : 'JE',
  'Jordan' : 'JO',
  'Kazakhstan' : 'KZ',
  'Kenya' : 'KE',
  'Kiribati' : 'KI',
  'Korea' : 'KR',
  'Kuwait' : 'KW',
  'Kyrgyzstan' : 'KG',
  'Lao People\'s Democratic Republic' : 'LA',
  'Latvia' : 'LV',
  'Lebanon' : 'LB',
  'Lesotho' : 'LS',
  'Liberia' : 'LR',
  'Libyan Arab Jamahiriya' : 'LY',
  'Liechtenstein' : 'LI',
  'Lithuania' : 'LT',
  'Luxembourg' : 'LU',
  'Macao' : 'MO',
  'Macedonia' : 'MK',
  'Madagascar' : 'MG',
  'Malawi' : 'MW',
  'Malaysia' : 'MY',
  'Maldives' : 'MV',
  'Mali' : 'ML',
  'Malta' : 'MT',
  'Marshall Islands' : 'MH',
  'Martinique' : 'MQ',
  'Mauritania' : 'MR',
  'Mauritius' : 'MU',
  'Mayotte' : 'YT',
  'Mexico' : 'MX',
  'Micronesia, Federated States Of' : 'FM',
  'Moldova' : 'MD',
  'Monaco' : 'MC',
  'Mongolia' : 'MN',
  'Montenegro' : 'ME',
  'Montserrat' : 'MS',
  'Morocco' : 'MA',
  'Mozambique' : 'MZ',
  'Myanmar' : 'MM',
  'Namibia' : 'NA',
  'Nauru' : 'NR',
  'Nepal' : 'NP',
  'Netherlands' : 'NL',
  'Netherlands Antilles' : 'AN',
  'New Caledonia' : 'NC',
  'New Zealand' : 'NZ',
  'Nicaragua' : 'NI',
  'Niger' : 'NE',
  'Nigeria' : 'NG',
  'Niue' : 'NU',
  'Norfolk Island' : 'NF',
  'Northern Mariana Islands' : 'MP',
  'Norway' : 'NO',
  'Oman' : 'OM',
  'Pakistan' : 'PK',
  'Palau' : 'PW',
  'Palestinian Territory, Occupied' : 'PS',
  'Panama' : 'PA',
  'Papua New Guinea' : 'PG',
  'Paraguay' : 'PY',
  'Peru' : 'PE',
  'Philippines' : 'PH',
  'Pitcairn' : 'PN',
  'Poland' : 'PL',
  'Portugal' : 'PT',
  'Puerto Rico' : 'PR',
  'Qatar' : 'QA',
  'Reunion' : 'RE',
  'Romania' : 'RO',
  'Russian Federation' : 'RU',
  'Rwanda' : 'RW',
  'Saint Barthelemy' : 'BL',
  'Saint Helena' : 'SH',
  'Saint Kitts And Nevis' : 'KN',
  'Saint Lucia' : 'LC',
  'Saint Martin' : 'MF',
  'Saint Pierre And Miquelon' : 'PM',
  'Saint Vincent And Grenadines' : 'VC',
  'Samoa' : 'WS',
  'San Marino' : 'SM',
  'Sao Tome And Principe' : 'ST',
  'Saudi Arabia' : 'SA',
  'Senegal' : 'SN',
  'Serbia' : 'RS',
  'Seychelles' : 'SC',
  'Sierra Leone' : 'SL',
  'Singapore' : 'SG',
  'Slovakia' : 'SK',
  'Slovenia' : 'SI',
  'Solomon Islands' : 'SB',
  'Somalia' : 'SO',
  'South Africa' : 'ZA',
  'South Georgia And Sandwich Isl.' : 'GS',
  'Spain' : 'ES',
  'Sri Lanka' : 'LK',
  'Sudan' : 'SD',
  'Suriname' : 'SR',
  'Svalbard And Jan Mayen' : 'SJ',
  'Swaziland' : 'SZ',
  'Sweden' : 'SE',
  'Switzerland' : 'CH',
  'Syrian Arab Republic' : 'SY',
  'Taiwan' : 'TW',
  'Tajikistan' : 'TJ',
  'Tanzania' : 'TZ',
  'Thailand' : 'TH',
  'Timor-Leste' : 'TL',
  'Togo' : 'TG',
  'Tokelau' : 'TK',
  'Tonga' : 'TO',
  'Trinidad And Tobago' : 'TT',
  'Tunisia' : 'TN',
  'Turkey' : 'TR',
  'Turkmenistan' : 'TM',
  'Turks And Caicos Islands' : 'TC',
  'Tuvalu' : 'TV',
  'Uganda' : 'UG',
  'Ukraine' : 'UA',
  'United Arab Emirates' : 'AE',
  'United Kingdom' : 'GB',
  'United States' : 'US',
  'United States Outlying Islands' : 'UM',
  'Uruguay' : 'UY',
  'Uzbekistan' : 'UZ',
  'Vanuatu' : 'VU',
  'Venezuela' : 'VE',
  'Viet Nam' : 'VN',
  'Virgin Islands, British' : 'VG',
  'Virgin Islands, U.S.' : 'VI',
  'Wallis And Futuna' : 'WF',
  'Western Sahara' : 'EH',
  'Yemen' : 'YE',
  'Zambia' : 'ZM',
  'Zimbabwe' : 'ZW'
  };

export function top10Countries(dataArray){
  //retreive all the countries
  const allCountries = dataArray.map(function (data) {
      return data['country'];
  });
  
  //count the repetition of each country, and save to a hashmap
  const mapCountries = new Map();
  for (var i = 0; i < allCountries.length; i++){
      var country = allCountries[i];

      //try to get the country code
      if (nameCountries[country]){
          country = nameCountries[country];
      }

      if (mapCountries.has(country)){
          let rep = mapCountries.get(country) + 1;
          mapCountries.set(country, rep);
      } else {
          mapCountries.set(country, 1);
      }
  }

  //sort the countries from highest to lowest repetition, then convert to an object array
  let sortedMapCountries = new Map([...mapCountries.entries()].sort((a, b) => b[1] - a[1]));
  sortedMapCountries = Array.from(sortedMapCountries, ([country, count]) => ({ country, count }));

  let top10 =[];
  for (var i = 0; i < 10; i++){
      if (sortedMapCountries[i]){
          top10.push(sortedMapCountries[i]);
      } else {
          break;
      }
  }
  
  return top10;
}


/**************** CALCULATING HOW MANY SOURCES EXIST IN SCHOOLS ****************/

export function numOfSchoolSources(dataArray){
  let sourceCounts = new Map();
  sourceCounts.set('1 Src.', 0);
  sourceCounts.set('2 Src.', 0);
  sourceCounts.set('3 Src.', 0);

  for(var i=0; i<dataArray.length; i++){
    var sourcesFound = 0;
    let data = dataArray[i];
    
    if (data['primary_source'] !== null){
      sourcesFound++;
      if (data['secondary_source'] !== null){
        sourcesFound++;
        if (data['tertiary_source'] !== null){
          sourcesFound++;
        }
      }
    }

    if (sourcesFound === 1){
      let newCount = sourceCounts.get('1 Src.') + 1;
      sourceCounts.set('1 Src.', newCount);
    } else if (sourcesFound === 2){
      let newCount = sourceCounts.get('2 Src.') + 1;
      sourceCounts.set('2 Src.', newCount);
    } else if (sourcesFound === 3){
      let newCount = sourceCounts.get('3 Src.') + 1;
      sourceCounts.set('3 Src.', newCount);
    }
  }

  let sourceCountsArray = Array.from(sourceCounts, ([numOfSourcesFound, count]) => ({ numOfSourcesFound, count }));
  return sourceCountsArray;
}


/**************** MODIFY OBJECT ARRAY TO BE TAKEN AS INPUT FOR PIECHART ****************/
//converts an object array with two parameters to data that can be passed to the piechart
//convertToPieChartData(numOfSchoolSources(rows), numOfSourcesFound, count)
export function convertToPieChartData(objectArray, key, value){
  var data = [];
  // {"id": "css", "label": "css", "value": 558, /* optional */ "color": "hsl(245, 70%, 50%)" }
  for (var i=0; i<objectArray.length; i++){
    var obj = objectArray[i];
    data.push(
      {'id': obj[key],
      'label': obj[key],
      'value': obj[value],
      });
  }
  return data;
}