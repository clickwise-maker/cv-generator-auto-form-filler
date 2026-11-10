# Payments: TEST mode only (form filler plans)

CV downloads (Color PDF / Plain PDF) are free and watermark-free for logged-in users.
Only the Auto Form Filler is paid (Single Use ₹20 / $1, Career Starter ₹1,000/yr, Global Pro $29/yr).

Server env vars (Worker secrets / env — never commit them):

    TRIAL_MODE=true                 # default; keeps everything in test
    PAYMENT_PROVIDER=razorpay
    RAZORPAY_KEY_ID=rzp_test_...    # only rzp_test_ keys are used while TRIAL_MODE=true
    RAZORPAY_KEY_SECRET=...
    RAZORPAY_WEBHOOK_SECRET=...

Without these, non-production builds use the built-in simulated checkout; production shows
"not yet available". A live key (rzp_live_…) is ignored unless TRIAL_MODE=false (not done on this branch).
