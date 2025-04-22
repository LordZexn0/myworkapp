import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-20">
        <div className="max-w-4xl mx-auto">
          <div className="transform hover:scale-[1.01] transition-transform duration-300">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ContactForm 
                formTitle="Contact Us"
                formDescription="Have a question or want to work together? Drop us a message below."
                fields={[
                  {
                    label: 'Name',
                    name: 'name',
                    type: 'text',
                    required: true,
                    placeholder: 'Your name'
                  },
                  {
                    label: 'Email',
                    name: 'email',
                    type: 'email',
                    required: true,
                    placeholder: 'Your email'
                  },
                  {
                    label: 'Message',
                    name: 'message',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Your message'
                  }
                ]}
                submitButtonText="Send Message"
                successMessage="Thank you for your message. We will get back to you soon!"
                errorMessage="Something went wrong. Please try again."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 