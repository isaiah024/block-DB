App = {
  web3: null,
  contracts: {},
  url: 'http://127.0.0.1:7545',
  network_id: 5777,
  currentAccount: '',
  userId: '',

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      App.web3 = new Web3(Web3.givenProvider);
    } else {
      App.web3 = new Web3(App.url);
    }
    ethereum.enable();
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Database.json', function (data) {
      App.contracts.Database = new App.web3.eth.Contract(data.abi, data.networks[App.network_id].address, {});
      App.currentAccount = App.web3._provider.selectedAddress;
    })
    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '#register', function () {
      App.handleRegistration(jQuery('#userId').val());
    });

    $(document).on('click', '#login', function () {
      App.handleLogin(jQuery('#userId').val());
    });

    $(document).on('click', '#submitQuery', function () {
      App.handleLoggingQuery(jQuery('#userId').val(), document.getElementById("query").value);
    });

    $(document).on('click', '#getEvents', function () {
      App.viewAllEvents();
    });

    $(document).on('click', '#newQuery', function () {
      window.location.href = "/query?userid=" + App.userId;
    });
  },

  handleRegistration: function (userId) {
    let option = { from: App.currentAccount }
    App.contracts.Database.methods.registerUser(userId)
      .send(option)
      .on('receipt', (receipt) => {
        console.log(receipt);
      })
      .on('error', (error) => {
        $('#message').text('Registration failed. User ID or account address are already registered.')
      })
  },

  handleLogin: function (userId) {
    let option = { from: App.currentAccount }
    App.contracts.Database.methods.loginUser(userId)
      .call(option)
      .then((result) => {
        if (result) {
          App.userId = userId;
          window.location.href = "/query?userid=" + userId;
        } else {
          $('#message').text('Login failed. User is not authenticated.')
        }
      })
  },

  handleLoggingQuery: function (userId, query){
    let option = { from: App.currentAccount }
    App.contracts.Database.methods.LogInfo(query).send(option);
  
    //$('#results').text("--------Results display here--------")
    //document.getElementById('results').value = query + " " + status;
  },

  viewAllEvents: function (){
    const START_BLOCK = 0;
    const END_BLOCK = 7701000;
    App.contracts.Database.getPastEvents("allEvents",
        {                               
            fromBlock: START_BLOCK,     
            toBlock: 'latest'         
        })                              
    .then(events => console.log(events))
    .catch((err) => console.error(err));
  },
}

$(function () {
  $(window).load(function () {
    App.init();
  });
});
