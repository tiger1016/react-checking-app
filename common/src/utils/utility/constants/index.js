export const CREDIT_CARD_DATA = [
  {
    format: function (n) {
      return n.replace(/\b(\d{4})(\d{6})(\d{5})\b/, '$1-$2-$3')
    },
    mask: () => ([/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]),
    name: 'amex',
    regex: /^3[47][0-9]{13}$/,
    title: 'American Express'
  },
  {
    format: (n) => n,
    mask: () => {},
    name: 'bcglobal',
    regex: /^(6541|6556)[0-9]{12}$/,
    title: 'BCGlobal'
  },
  {
    format: (n) => n,
    mask: () => {},
    name: 'carte-blanche',
    regex: /^389[0-9]{11}$/,
    title: 'Carte Blanche'
  },
  {
    format: function (n) {
      return n.replace(/\b(\d{4})(\d{6})(\d{4})\b/, '$1-$2-$3')
    },
    mask: () => ([/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]),
    name: 'diners-club',
    regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    title: 'Diners Club'
  },
  {
    format: function (n) {
      return n.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/, '$1-$2-$3-$4')
    },
    mask: () => ([/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]),
    name: 'discover',
    regex: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
    title: 'Discover'
  },
  {
    format: (n) => n,
    mask: () => {},
    name: 'insta-payment',
    regex: /^63[7-9][0-9]{13}$/,
    title: 'Insta Payment'
  },
  {
    format: function (n) {
      return n.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/, '$1-$2-$3-$4')
    },
    mask: () => ([/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]),
    name: 'jcb',
    regex: /^(?:2131|1800|35\d{3})\d{11}$/,
    title: 'JCB'
  },
  {
    format: (n) => n,
    mask: () => {},
    name: 'korean-local',
    regex: /^9[0-9]{15}$/,
    title: 'Korean Local'
  },
  {
    format: (n) => n,
    mask: () => {},
    name: 'laser',
    regex: /^(6304|6706|6709|6771)[0-9]{12,15}$/,
    title: 'Laser'
  },
  {
    format: (n) => n,
    mask: () => {},
    name: 'maestro',
    regex: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
    title: 'Maestro'
  },
  {
    format: function (n) {
      return n.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/, '$1-$2-$3-$4')
    },
    mask: () => ([/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]),
    name: 'mastercard',
    regex: /^5[1-5][0-9]{14}$/,
    title: 'Mastercard'
  },
  {
    format: function (n) {
      return n.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/, '$1-$2-$3-$4')
    },
    mask: () => ([/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]),
    name: 'solo',
    regex: /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/,
    title: 'Solo'
  },
  {
    format: function (n) {
      return n.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/, '$1-$2-$3-$4')
    },
    mask: () => ([/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]),
    name: 'switch',
    regex: /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/,
    title: 'Switch'
  },
  {
    format: (n) => n,
    mask: () => {},
    name: 'union-pay',
    regex: /^(62[0-9]{14,17})$/,
    title: 'Union Pay'
  },
  {
    format: function (n) {
      if (n.length === 13) return n.replace(/\b(\d{4})(\d{5})(\d{4})\b/, '$1-$2-$3')
      if (n.length === 16) return n.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/, '$1-$2-$3-$4')
      return n
    },
    mask: (n) => {
      // if (n.length === 13) return [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      if (n.length === 16) return [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      return null
    },
    name: 'visa',
    regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
    title: 'Visa'
  },
  {
    format: (n) => n,
    mask: () => {},
    name: 'visa-master',
    regex: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/,
    title: 'Visa Master'
  }
]
