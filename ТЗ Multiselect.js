// Написати компонент Multiselect
// Дизайн компонента такий як в цій темі 
//https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/forms/select

// Properties

value:{
    Type: "object|array|string|number|null"
    //The value of the element
    example:{
        "1",
        {id:"2", name:"Label 2"} //when "object" props = true,
        // "",
         
        // when multi :
        [1, "2"],
        [ 
            { id:"1", name:"Label 1"},
            {id:"2", name:"Label 2"},
         ]
!!!!!!!!!!!!!!!!!!! 
         
    }
}
v-model:{
    //  two-way binding of the value of the element
    Type: "object|array|string|number|null"
    example:{
        "1",
        {id:"2", name:"Label 2"} //when "object" props = true,
        // "",

        // when multi :
        [1, "2"],
        [ 
            { id:"1", name:"Label 1"},
            {id:"2", name:"Label 2"},
         ]
    }
}
items: {
    Type: "object|array|"
    Default: {}
    example:{
        [1,"2",3],
        [
            { id:"1", name:"Label 1"},
            {id:"2", name:"Label 2"},
            { id:"3", name:"Label 3"}
        ],        
        // {
        //     value1:"label 1",
        //     value2:"label 2",
        //     value3:"label 3"
        // }
    }
       
}

multiple:{
    //Allow select more than one option 
    Type: boolean,
    Default: true
}
tags: {
    //Display selected options as 'tags' 
    type: Boolean,
    default: true,
}
object:{
    //Usead when the value should contain the full option object
    Type: boolean,
    Default: true
}
labelProp: {
    //name of the property that contains the option label when items is an array of objects
    Type: "string",
    Default: "label"
}
valueProp: {
    //name of the property that contains the option value when items is an array of objects
    Type: "string",
    Default: "id"
}
search:{
    //Enables searching among options
    Type: boolean,
    Default: false
}
searchBy:{
    //The name of the object property that contains the text that should be searched 
    Type: string,
    Default: label
}
hideSelected:{
    //hidden selected options from the option list
    Type: boolean,
    Default: true
}
disabled:{
    //Disables the multiselect
    Type: boolean,
    Default: false
}
default:{
    //Sets the default value
    Type: array,
    Default: []
}
label:{
    //Label for the element
    Type: string,
    Default: null
}
placeholder:{
    //Placeholder attribute
    Type: string,
    Default: null
}

// Events
@change { 
    //Triggered when the value is changed  
    newValue //the new value
    oldValue //the old value
}
@select {
    //Triggered when an option is selected
    option  //the selected option
}
@deselect {
    //Triggered when an option is deselected
    option  //the selected option
}
@search-change {
    //Triggered when the search query changes when using search: true.
}