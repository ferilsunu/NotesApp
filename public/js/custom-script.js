$( document ).ready(function() {
   
    $('.edit-button').on('click',function(){
        var button_value = $(this).val()
        
    
        $.ajax({
            url: '/getEditInfo', 
            method: 'POST',           
            contentType: 'application/json',
            data: JSON.stringify({new_id:button_value}),
            success: function(data){
    
                $('.editInput').val(data.name)
                $('.editInputId').val(data._id)
            }            
    
        })



    })



    







});