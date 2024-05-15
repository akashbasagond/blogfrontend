import React,{useState} from 'react';
// import './Cssfiles/Homepage.css'; // Import CSS file directly
  
// import Navbar from './Nav';  
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
 

const Contacts = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const [disabled, setDisabled] = useState(false);
      const [alertInfo, setAlertInfo] = useState({
        display: false,
        message: '',
        type: '',
      });
    
      // Shows alert message for form submission feedback
      const toggleAlert = (message, type) => {
        setAlertInfo({ display: true, message, type });
    
        // Hide alert after 5 seconds
        setTimeout(() => {
          setAlertInfo({ display: false, message: '', type: '' });
        }, 5000);
      };
    
      // Function called on submit that uses emailjs to send email of valid contact form
      const onSubmit = async (data) => {
        // Destrcture data object
        const { name, email, message } = data;
        try {
          // Disable form while processing submission
          setDisabled(true);
    
          // Define template params
          const templateParams = {
            name,
            email, 
            message,
          };
    
          // Use emailjs to email contact form data
          await emailjs.send(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_PUBLIC_KEY,
          );
    
          // Display success alert
          toggleAlert('Form submission was successful!', 'success');
        } catch (e) {
          console.error(e);
          // Display error alert
          toggleAlert('Uh oh. Something went wrong.', 'danger');
        } finally {
          // Re-enable form submission
          setDisabled(false);
          // Reset contact form fields after submission
          reset();
        }
      };
    
  return (
    <div className="container">
     {/* <Navbar/> */}
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
    
              <form
                id='contact-form'
                onSubmit={handleSubmit(onSubmit)}
                noValidate 
              >
               <h2 className="animatedHeader" style={{ animation: 'slideIn 0.5s ease-in-out forwards' ,marginBottom: "0.5rem"}}>Get in touch</h2>
                {/* Row 1 of form */}
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                    //   {...register('name', {
                    //     required: {
                    //       value: true,
                    //     //   message: 'Please enter your name',
                    //     },
                    //     maxLength: {
                    //       value: 30,
                    //     //   message: 'Please use 30 characters or less',
                    //     },
                    //   })}
                      className='form-control formInput'
                      placeholder='Name'
                    style={{borderRadius:"10rem",textAlign: "center", marginBottom: "0.5rem",width:"30rem",height:'2rem'}}></input>
                    {errors.name && (
                      <span className='errorMessage'>
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className='col-6'>
                    <input
                      type='email'
                      name='email'
                      {...register('email', {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                      className='form-control formInput'
                      placeholder='Email address'
                      style={{borderRadius:"10rem",textAlign: "center",width:"30rem",height:'2rem',marginBottom:"0.5rem"}}></input>
                    {/* {errors.email && (
                      <span className='errorMessage'>
                        Please enter a valid email address
                      </span>
                    )} */}
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
                
                </div>
                {/* Row 3 of form */}
                <div className='row formRow'>
                  <div className='col'>
                  <textarea
                    rows={3}
                    name='message'
                    {...register('message', {
                        required: true,
                    })}
                    className='form-control formInput'
                    placeholder='Message'
                    style={{ borderRadius: "4rem", textAlign: "center" ,marginBottom:"0.5rem",width:"30rem",height:'5rem'}}
                    ></textarea>

                    {/* {errors.message && (
                      <span className='errorMessage'>
                        Please enter a message
                      </span>
                    )} */}
                  </div>
                </div>

                <button 
                  disabled={disabled}
                  type='submit' style={{borderRadius: "4rem",backgroundColor:'#70E1B6',width:"10rem",height:"3rem",justifyContent:"center",marginLeft:"160px"}}
                >
                  Submit
                </button>
                
              </form> 
      {alertInfo.display && (
        <div
          className={`alert alert-${alertInfo.type} alert-dismissible mt-5`}
          role='alert'
        >
          {alertInfo.message}
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label='Close'
            onClick={() =>
              setAlertInfo({ display: false, message: '', type: '' })
            }  
          ></button>
        </div>
      )} 
    </main>
   
      <footer style={{fontSize: "1rem", textAlign: "center", fontFamily: "Helvetica",  animation: "neonText 22s ease infinite"}}>
  
</footer>
    </div>
  );
}

export default Contacts;
