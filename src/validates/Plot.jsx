export const plotValidate = (values) =>{
    let error ={};

    if(!values.plotSaleStatus){
        error.plotSaleStatus = "Plot Sale Status is required";
    }

    if(!values.propertyType){
        error.propertyType = "Property Type is required";
    }

    return error;
}