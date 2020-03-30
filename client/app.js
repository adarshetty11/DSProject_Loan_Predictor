function onPageLoad(){
    console.log( "document loaded" );
    var url1 = "http://127.0.0.1:5000/get_dependents"; 
    $.get(url1,function(data, status) {
        console.log("got response for get_dependents request");
        if(data) {
            var dependents = data.dependents;
            var uidependents = document.getElementById("uidependents");
            $('#uidependents').empty();
            for(var i in dependents) {
                var opt = new Option(dependents[i]);
                $('#uidependents').append(opt);
            }
        }
    });

    var url2 = "http://127.0.0.1:5000/get_property_area"; 
    $.get(url2,function(data, status) {
        console.log("got response for get_property_area request");
        if(data) {
            var properties = data.properties;
            var uiproperty = document.getElementById("uiproperty");
            $('#uiproperty').empty();
            for(var i in properties) {
                var opt = new Option(properties[i]);
                $('#uiproperty').append(opt);
            }
        }
    });
}


function getGenderValue() {
    var uigender = document.getElementsByName("uigender");
    for(var i in uigender) {
      if(uigender[i].checked) {
          return parseInt(i);
      }
    }
    return -1;
}

function getMarriedValue() {
    var uimarried = document.getElementsByName("uimarried");
    for(var i in uimarried) {
      if(uimarried[i].checked) {
          return parseInt(i);
      }
    }
    return -1;
}

function getEducationValue() {
    var uieducation = document.getElementsByName("uieducation");
    for(var i in uieducation) {
      if(uieducation[i].checked) {
          return parseInt(i);
      }
    }
    return -1;
}

function getEmployedValue() {
    var uiemploy = document.getElementsByName("uiselfemployed");
    for(var i in uiemploy) {
      if(uiemploy[i].checked) {
          return parseInt(i);
      }
    }
    return -1;
}

function getCreditValue() {
    var uicredit = document.getElementsByName("uihistory");
    for(var i in uicredit) {
      if(uicredit[i].checked) {
          return parseInt(i);
      }
    }
    return -1;
}

function onClickedPredictLoan() {
    console.log("Predict Loan button clicked");
   
    var gender = getGenderValue();
    var married = getMarriedValue();
    var education = getEducationValue();
    var employed = getEmployedValue();
    var app_income = document.getElementById("uiappin");
    var co_app_income = document.getElementById("uiappinterm");
    var loan = document.getElementById("uiloan");
    var loan_term = document.getElementById("uiloan_term");
    var credit = getCreditValue();
    var dependent = document.getElementById("uidependents");
    var properties = document.getElementById("uiproperty");
    var predictloan = document.getElementById("uiPredictloan");

    var url = "http://127.0.0.1:5000/loan_prediction"; 
    
    $.post(url, {
        gender: gender,
        married: married,
        education: education,
        self_employed: employed,
        applicantincome: parseFloat(app_income.value),
        coapplicantincome: parseFloat(co_app_income.value),
        loanamount:parseFloat(loan.value),
        loan_amount_term: parseFloat(loan_term.value),
        credit_history: credit,
        dependents:dependent.value,
        property_area:properties.value
    },function(data, status) {
        console.log(data.predict_loan);
        if(data.predict_loan == 1)
            res = "Loan Approved!!";
        else
            res = "Loan Not Approved!!";
        predictloan.innerHTML = "<h2>" + res + "</h2>";
        console.log(status);
    });
  }

  window = onPageLoad()