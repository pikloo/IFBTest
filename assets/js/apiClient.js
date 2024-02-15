const apiClient = {
  rootURL : 'http://localhost:8000',

  sendRequest: function(method, url, data = null) {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let fetchOptions = {
        'method': method,
        // On ajoute les headers dans les options
        'headers': myHeaders,
        'mode': 'cors', 
    };

  

    // si et seulement si il y a des data, il faut ajouter dans options du fetch le body qui va contenir les data
    if(data !== null)  {
      fetchOptions.body = JSON.stringify(data)
    }
    

    return fetch(url, fetchOptions)
      .then(function(response) {
        if(response.status !== 204){
          return response.json()
        }else {
          return response
        }
      }).then(function(data) {
        return data;
      });


  }
};
