$( document ).ready(function() {
   
    const demoLoginData = {
        email: 'demo@ferilsunu.com',
        password: 'demo1234'
    }
    $("#email").val(demoLoginData.email)
    $("#password").val(demoLoginData.password)
    
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