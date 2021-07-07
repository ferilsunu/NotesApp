const moment = require('moment')
module.exports = {

    /*-----------Select Helper-----------*/
    select: function(selected,options){
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'),         '$& selected="selected"').replace(         new RegExp('>' + selected + '</option>'),         ' selected="selected"$&')
    },
    /*-----------End Select Helper-----------*/
    /*-----------GenerateDate Helper-----------*/
    GenerateDate: function (date,format) {
        return moment(date).format(format)
    },
    /*-----------Generate Date Helper-----------*/

  
}