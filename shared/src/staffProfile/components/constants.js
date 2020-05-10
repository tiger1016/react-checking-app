export const CUSTOMER_PROFILE = {
  dataDefinition: {
    header: 'Staff Profile',
    navTab: ['Profile', 'Order Qr Codes', 'Passwords', 'Payment Info', 'Bank Info', 'Profile Pic'],
    label: ['Full Name', 'Business Name', 'Username (email)', 'Business Address', 'Shipping Address', 'Business Phone', 'Sales Tax %', 'Timezone', 'Company logo'],
    data: [
      {
        id: 1,
        fName: 'John Doe',
        bName: 'Test Dog Walker Company',
        username: 'licensee@example.com',
        bAddress: {
          sAddress: '100 Test Drive',
          sAddress1: 'Ste 490',
          city: 'Chicago',
          state: 'IL',
          zip: '60060'
        },
        sAddress: true,
        phone: '123-455-4322',
        sTax: '0',
        tZone: 'UMS',
        logo: '//dcassetcdn.com/design_img/194601/23694/23694_2211077_194601_image.png'
      }
    ],
    staffprofile: {
      username: 'test test',
      phone_mobile: '9876543210',
      phone_work: '1234567890',
      phone_home: '7418529630',
      address: '#334',
      address2: 'modalctown',
      city: 'LA',
      zip: '32067',
      name_Emergency: 'seth',
      phone_Emergency: '1234567890',
      hire_date: '11/10/2021',
      bio: '',
      transportation_type: '',
      license_plate: '',
      security_question: '',
      security_answer: '',
      notes: '',
      payroll_frequency: 'NO',
      payroll_date: '',
      email_payroll_reports: 'NO',
      email_alerts: 'NO',
      walker_access_level: 'Scheduling Admin'
    }
  }
}
