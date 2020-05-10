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
