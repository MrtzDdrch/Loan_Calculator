// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Hide results
  document.getElementById('results').style.display = 'none';
  // SHow Loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 500);

});

// Calculate Results
function calculateResults(e){
  
  // UI Variables
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    // Hide Spinner
    document.getElementById('loading').style.display = 'none';
    // Show results
    document.getElementById('results').style.display = 'block';
  } else {
    showError('Please check your numbers');
  }
}

function showError(error){
  // Hide spinnder
  document.getElementById('loading').style.display = 'none';
  // create div
  const errorDiv = document.createElement('div');
  // Get parent elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add class
  errorDiv.className = 'alert alert-danger';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // insert error above heading
  card.insertBefore(errorDiv, heading);
  // Clear error message after 5 seconds
  setTimeout(clearError, 3000);
}

// Clear error function
function clearError(){
  document.querySelector('.alert').remove();
}