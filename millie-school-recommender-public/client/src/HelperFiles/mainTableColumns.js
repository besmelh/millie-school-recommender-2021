 /*
* Note: the field must match the column name in the CSV file
* 
* 
    {
        //must match csv file in DB
        field_name_db: 'primary_source',

        //will be the width of the column in the main table in the browse page
        column_width: 100, => 

        //by default the title of the column will just be a cleaned version of field_name_db, but if you want it to be different input that here 
        field_name_view: '1st Src.'
    }
*/
export const mainTableColumns = [
    {
        field_name_db: 'relevance',
        column_width: 130,
        render_cell: 1,
    }, 
    {
        field_name_db: 'status',
        column_width: 125,
    }, 
    {
        field_name_db: 'school_name',
        column_width: 300,
    }, 
    {
        field_name_db: 'country',
        column_width: 150,
    }, 
    {
        field_name_db: 'millie_code',
        column_width: 150,
    }, 
    {
        field_name_db: 'primary_source',
        column_width: 120,
        field_name_view: '1st Src.',
    }, 
    {
        field_name_db: 'secondary_source',
        column_width: 120,
        field_name_view: '2nd Src.',
    }, 
    {
        field_name_db: 'tertiary_source',
        column_width: 120,
        field_name_view: '3rd Src.',
    }, 
    {
        field_name_db: 'tuition_usd',
        column_width: 125,
        field_name_view: 'Tuition($)',
    }, 
]