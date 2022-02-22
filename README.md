#nhrquery

This is almost an alternative of jQuery with same functions.

=> Just use 'n' instead of 'jQuery' or '$' sign like : 
------------------------------------------------------

n("body").css({
    background: 'red'
});

=> For ajax : 
-------------
nhrQuery.ajax({
    url: 'your_url',
    type: 'GET'/'POST',
    async: true,
    data: { name: "Nowshad" },
    success: (response) => {
        alert(response);
    }
});