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

export const CUSTOMER_PROFILE_CUSTOMER_TABLE = {
  dataDefinition: {
    navTab: ['Profile', 'Pets', 'Invoices', 'Rates', 'Refunds & Credits', 'Payment Info'],
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
    ]
  }
}

export const PAYMENT_INFO = {
  dataDefinition: {
    paymentInfo: {
      firstSlide: [
        {
          id: 1,
          PaymentType: 'Credit Card',
          BillingTime: '?',
          BillingCycle: 'Monthly',
          BillingDate: '1st',
          CardType: 'Visa',
          CardNumber: '4509********4398',
          CVV: '***',
          CardExpiration: '12/2016'
        }
      ],
      secondSlide: [
        {
          firstName: 'Rosalie',
          LastNameonCard: 'Diaz',
          BillingAddress: '400 Wisteria Lane',
          BillingAddress2: 'ste. 12',
          BillingCity: 'Austin',
          BillingState: 'TX',
          BillingZip: '29010'
        }
      ]
    }
  }
}

export const CUSTOMER_PROFILE_INFO = {
  dataDefinition: {
    contactInfo: {
      header: 'Contact Information',
      primaryContact: [
        {
          id: 1,
          name: 'Rosalie Diaz',
          email: 'trevor_rau@hotmail.com',
          mobilePhone: '939-079-5548',
          workPhone: '249-605-2864',
          homePhone: '572-448-0994',
          address: '0847 Lind Plains, Stephanietown, CA 90210'
        }
      ],
      secondaryContact: [
        {
          name: 'Rosalie Diaz',
          email: 'kunze.alex@gmail.com',
          mobilePhone: '623-434-4871',
          workPhone: '410-548-8423',
          homePhone: '152-729-5877'
        }
      ],
      emergencyContact: [
        {
          name: 'Fernando Rodriguez',
          email: 'fernando@hotmail.com',
          mobilePhone: '695-280-7202',
          workPhone: '541-289-2008',
          homePhone: '867-696-7283'
        }
      ]
    },
    profileInfo: {
      header: 'Profile Info',
      data: [
        {
          password: '**********',
          houseAlarm: 'Yes',
          notes: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
          qrCode: '#00011',
          qrCodeLocation: 'Located at the door of the fridge in the kitchen',
          defaultStaff: 'Nathaniel Robinson',
          defaultService: '1-hr Dog Walk',
          signUpDate: '4/21/2014',
          referredBy: 'David Norman',
          attachment: 'Terms & Conditions.docx',
          attachment1: 'Medications.pdf'
        }
      ]
    },
    images: [
      {
        customerImage: '//devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg',
        petImage: [
          { image: '//www.europuppy.com/wp-content/uploads/2017/06/BP1840enb170428_M1_1.jpg' },
          { image: '//res.cloudinary.com/petrescue/image/upload/h_638,w_638,c_fill,g_face,q_auto:best/petrescue-production-s3/uploads/pet_photos/2015/10/30/402526_b02c5_orig.jpg' }
        ]
      }
    ],
    pets: [
      {
        id: 1,
        bName: 'Test Dog Walker Company',
        feedingInfo: 'Any Dog Food',
        type: 'dog',
        feedingTimes: '3 Times a Day',
        breed: 'Jack Russel',
        foodAmount: '3 cups MAx',
        color: 'green',
        gender: 'male',
        treats: 'literally Anyting',
        meditationInfo: 'No Medication',
        energyLevel: 'Low',
        vacinationDate: '18/06/1994',
        aggressingTowardsHumar: 'Low',
        vetName: 'asdas',
        vetPhone: '8493028',
        birthday: '16-32-232',
        collar: 'ieqwjklcas',
        notes: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
        image: '//dcassetcdn.com/design_img/194601/23694/23694_2211077_194601_image.png',
        weight: '100bs',
        address: 'Houston',
        hospital: 'vetDoc.Inc'
      },
      {
        id: 1,
        bName: 'Test Dog Walker Company',
        feedingInfo: 'Any Dog Food',
        type: 'dog',
        feedingTimes: '3 Times a Day',
        breed: 'Jack Russel',
        foodAmount: '3 cups MAx',
        color: 'green',
        gender: 'male',
        treats: 'literally Anyting',
        meditationInfo: 'No Medication',
        energyLevel: 'Low',
        vacinationDate: '18/06/1994',
        aggressingTowardsHumar: 'Low',
        vetName: 'asdas',
        vetPhone: '8493028',
        birthday: '16-32-232',
        collar: 'ieqwjklcas',
        notes: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
        image: '//charlieandspike.com/wp-content/uploads/2016/10/spike_cuddle-1-300x300.jpg',
        weight: '100lbs',
        address: 'Houston',
        hospital: 'vetDoc.Inc'
      }
    ],
    invoiceInfo: {
      header: 'Invoice Info',
      data: [
        {
          date: '04/05/2017',
          number: '585637',
          dueDate: '04/05/2017',
          status: 'UNPAID',
          amtDue: 56.00,
          amtPaid: 0,
          datePaid: '-',
          outstanding: 56.00,
          edit: 'yes'
        },
        {
          date: '04/01/2017',
          number: '329092',
          dueDate: '04/01/2017',
          status: 'PARTIAL',
          amtDue: 1290.00,
          amtPaid: 1000.00,
          datePaid: '01/01/2017',
          outstanding: 280.00,
          edit: 'yes'
        },
        {
          date: '03/12/2017',
          number: '485631',
          dueDate: '03/12/2017',
          status: 'PAID',
          amtDue: 43.00,
          amtPaid: 43.00,
          datePaid: '03/12/2017',
          outstanding: 0,
          edit: ''
        },
        {
          date: '02/21/2017',
          number: '635630',
          dueDate: '02/21/2017',
          status: 'PAID',
          amtDue: 59.00,
          amtPaid: 59.00,
          datePaid: '02/21/2017',
          outstanding: 0,
          edit: ''
        },
        {
          date: '01/16/2017',
          number: '085639',
          dueDate: '01/16/2017',
          status: 'PAID',
          amtDue: 190.00,
          amtPaid: 190.00,
          datePaid: '01/16/2017',
          outstanding: 0,
          edit: ''
        },
        {
          date: '01/10/2017',
          number: '985632',
          dueDate: '01/10/2017',
          status: 'PAID',
          amtDue: 15.00,
          amtPaid: 15.00,
          datePaid: '01/10/2017',
          outstanding: 0,
          edit: ''
        }
      ]
    },
    refundsAndCredits: {
      refunds: [
        { date: '04/05/2017', amount: '56.00' },
        { date: '04/01/2017', amount: '1290.00' }
      ],
      credits: [
        { date: '04/05/2017', status: 'USED', amount: '56.00' },
        { date: '04/01/2017', status: 'UNUSED', amount: '1290.00' }
      ]
    }
  }
}

export const RATES = {
  rateDefinition: {
    serviceRate: {
      details: [
        {
          service1: '1 Hour, 30 minute dog walk',
          service2: '45 minute dog walk',
          service3: '30 minute cat visit',
          service4: '1 Hour dog walk',
          service5: '45 minute cat visit',
          service6: 'one minute walk',
          rate1: '$50.00',
          rate2: '$30.00',
          rate3: '$13.00',
          rate4: '$10.00',
          rate5: '$5.00',
          rate6: '$1.00'
        }
      ]
    },

    addOnRate: {
      data: [
        {
          add1: 'Second pet',
          add2: 'Vacation Care 1',
          add3: 'Plant Watering',
          add4: 'Night/Weekend Charge',
          add5: 'Vacation Care 2',
          rate1: '$5.00',
          rate2: '$3.00',
          rate3: '$1.00',
          rate4: '$1.00',
          rate5: '$3.00'
        }
      ]
    }

  }
}

export const HOURS = [
  { label: '12', value: '12' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' }
]
export const DAYS = [
  { value: 'Monday', label: 'Monday', className: 'Days-filter Monday' },
  { value: 'Tuesday', label: 'Tuesday', className: 'Days-filter Tuesday' },
  { value: 'Wednesday', label: 'Wednesday', className: 'Days-filter Wednesday' },
  { value: 'Thursday', label: 'Thursday', className: 'Days-filter Thursday' },
  { value: 'Friday', label: 'Friday', className: 'Days-filter Friday' },
  { value: 'Saturday', label: 'Saturday', className: 'Days-filter Saturday' },
  { value: 'Sunday', label: 'Sunday', className: 'Days-filter Sunday' }
]
export const FREQUENCY = [
  { value: 'All Frequencies', label: 'All Frequencies', className: 'Frequencies-filter All Frequencies' },
  { value: 'Recurring Weekly', label: 'Recurring Weekly', className: 'Frequencies-filter Recurring Weekly' },
  { value: 'Recurring Bi-Weekly', label: 'Recurring Bi-Weekly', className: 'Frequencies-filter Recurring Bi-Weekly' },
  { value: 'RecurringMonthly', label: 'Recurring Monthly', className: 'Frequencies-filter Recurring Monthly' },
  { value: 'once', label: 'One Time', className: 'Frequencies-filter One Time' }
]
export const START_TIME = [
  { value: '1', label: '1', className: 'Start-time-filter 1' },
  { value: '2', label: '2', className: 'Start-time-filter 2' },
  { value: '3', label: '3', className: 'Start-time-filter 3' },
  { value: '4', label: '4', className: 'Start-time-filter 4' },
  { value: '5', label: '5', className: 'Start-time-filter 5' },
  { value: '6', label: '6', className: 'Start-time-filter 6' },
  { value: '7', label: '7', className: 'Start-time-filter 7' },
  { value: '8', label: '8', className: 'Start-time-filter 8' },
  { value: '9', label: '9', className: 'Start-time-filter 9' },
  { value: '10', label: '10', className: 'Start-time-filter 10' },
  { value: '11', label: '11', className: 'Start-time-filter 11' },
  { value: '12', label: '12', className: 'Start-time-filter 12' }
]
export const MINUTES = [
  { label: '00', value: '00' },
  { label: '01', value: '01' },
  { label: '02', value: '02' },
  { label: '03', value: '03' },
  { label: '04', value: '04' },
  { label: '05', value: '05' },
  { label: '06', value: '06' },
  { label: '07', value: '07' },
  { label: '08', value: '08' },
  { label: '09', value: '09' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14', value: '14' },
  { label: '15', value: '15' },
  { label: '16', value: '16' },
  { label: '17', value: '17' },
  { label: '18', value: '18' },
  { label: '19', value: '19' },
  { label: '20', value: '20' },
  { label: '21', value: '21' },
  { label: '22', value: '22' },
  { label: '23', value: '23' },
  { label: '24', value: '24' },
  { label: '25', value: '25' },
  { label: '26', value: '26' },
  { label: '27', value: '27' },
  { label: '28', value: '28' },
  { label: '29', value: '29' },
  { label: '30', value: '30' },
  { label: '31', value: '31' },
  { label: '32', value: '32' },
  { label: '33', value: '33' },
  { label: '34', value: '34' },
  { label: '35', value: '35' },
  { label: '36', value: '36' },
  { label: '37', value: '37' },
  { label: '38', value: '38' },
  { label: '39', value: '39' },
  { label: '40', value: '40' },
  { label: '41', value: '41' },
  { label: '42', value: '42' },
  { label: '43', value: '43' },
  { label: '44', value: '44' },
  { label: '45', value: '45' },
  { label: '46', value: '46' },
  { label: '47', value: '47' },
  { label: '48', value: '48' },
  { label: '49', value: '49' },
  { label: '50', value: '50' },
  { label: '51', value: '51' },
  { label: '52', value: '52' },
  { label: '53', value: '53' },
  { label: '54', value: '54' },
  { label: '55', value: '55' },
  { label: '56', value: '56' },
  { label: '57', value: '57' },
  { label: '58', value: '58' },
  { label: '59', value: '59' }
]

export const MINUTES_BY_FIVE = [
  { label: '00', value: '00' },
  { label: '05', value: '05' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '30', value: '30' },
  { label: '35', value: '35' },
  { label: '40', value: '40' },
  { label: '45', value: '45' },
  { label: '50', value: '50' },
  { label: '55', value: '55' }
]
export const AM_PM = [
  { value: 'am', label: 'am', className: 'Ampm-filter am' },
  { value: 'pm', label: 'pm', className: 'Ampm-filter pm' }
]

export const STATES = [
  { value: 'AK', label: 'Alaska' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'IA', label: 'Iowa' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Lousiana' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MD', label: 'Maryland' },
  { value: 'ME', label: 'Maine' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MT', label: 'Montana' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NY', label: 'New York' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VA', label: 'Virginia' },
  { value: 'VT', label: 'Vermont' },
  { value: 'WA', label: 'Washington' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WY', label: 'Wyoming' }]
