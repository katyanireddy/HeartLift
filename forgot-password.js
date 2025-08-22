const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Password reset instructions have been sent to your email.');
    forgotForm.reset();
  });
}
