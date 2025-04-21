import { Language } from '../context/LanguageContext';

// Define the translation type structure for better type checking
export type TranslationSchema = {
  header: {
    title: string;
    subtitle?: string;
    tagline: string;
  };
  navigation: {
    home: string;
    about: string;
    services: string;
    contact: string;
  };
  common: {
    submitButton: string;
    thankYou: string;
    successMessage: string;
    processing: string;
  };
  forms: {
    common: {
      subtitle: string;
      requiredFields: string;
      selectDistrict: string;
      selectTaluka: string;
      submitDetails: string;
      forBoth: string;
    };
    landowner: {
      title: string;
      fields: {
        name: string;
        mobile: string;
        village: string;
        district: string;
        taluka: string;
        location: string;
        landSize: string;
        substationName: string;
        substationDistance: string;
        option: string;
        sellRate: string;
        leaseRate: string;
        isOwner: string;
      };
      options: {
        sell: string;
        lease: string;
        yes: string;
        no: string;
      };
      placeholders: {
        name: string;
        mobile: string;
        village: string;
        location: string;
        landSize: string;
        substationName: string;
        substationDistance: string;
        rate: string;
      };
    };
    company: {
      title: string;
      fields: {
        contactName: string;
        companyName: string;
        mobile: string;
        email: string;
        district: string;
        taluka: string;
        landSize: string;
        requirements: string;
        budget: string;
        timeline: string;
        option: string;
      };
      options: {
        buy: string;
        lease: string;
      };
      placeholders: {
        contactName: string;
        companyName: string;
        mobile: string;
        email: string;
        landSize: string;
        requirements: string;
        budget: string;
        timeline: string;
      };
    };
  };
  userTypes: {
    landowner: string;
    solarCompany: string;
  };
  notices: {
    important: string;
    substationDistance: string;
    companyHelp: string;
    dataSecurity: string;
    dataPrivacy: string;
  };
  buttons: {
    submitLandDetails: string;
    submitCompany: string;
    knowBenefits: string;
  };
};

export const translations: Record<Language, TranslationSchema> = {
  gu: {
    header: {
      title: "ગુજરાત રિન્યુએબલ્સ",
      subtitle: "ગુજરાતના શક્તિશાળી ભવિષ્ય માટે",
      tagline: "ગુજરાતને સૌર ઊર્જાથી ધબકતું બનાવીએ"
    },
    navigation: {
      home: "હોમ",
      about: "અમારા વિશે",
      services: "સેવાઓ",
      contact: "સંપર્ક",
    },
    common: {
      submitButton: "સબમિટ કરો",
      thankYou: "આભાર!",
      successMessage: "તમારી વિનંતી સફળતાપૂર્વક સબમિટ કરવામાં આવી છે. અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.",
      processing: "પ્રક્રિયા કરી રહ્યા છીએ...",
    },
    forms: {
      common: {
        subtitle: "કૃપા કરીને નીચેના ફોર્મને ભરો અને અમે તમારો સંપર્ક કરીશું.",
        requiredFields: "જરૂરી ફીલ્ડ્સ",
        selectDistrict: "જિલ્લો પસંદ કરો",
        selectTaluka: "તાલુકો પસંદ કરો",
        submitDetails: "તમારી વિગતો સબમિટ કરો",
        forBoth: "અમે તમારો સંપર્ક કરીશું.",
      },
      landowner: {
        title: "જમીન માલિક માહિતી",
        fields: {
          name: "નામ",
          mobile: "મોબાઈલ નંબર",
          village: "ગામ",
          district: "જિલ્લો",
          taluka: "તાલુકો",
          location: "સ્થળ (વૈકલ્પિક)",
          landSize: "જમીનનું કદ (એકરમાં)",
          substationName: "નજીકના સબસ્ટેશનનું નામ",
          substationDistance: "સબસ્ટેશનથી અંતર (કિમી)",
          option: "વિકલ્પ",
          sellRate: "વેચાણ દર (₹/એકર)",
          leaseRate: "ભાડા દર (₹/એકર/વર્ષ)",
          isOwner: "શું તમે જમીનના માલિક છો?",
        },
        options: {
          sell: "વેચવા માંગુ છું",
          lease: "ભાડે આપવા માંગુ છું",
          yes: "હા",
          no: "ના",
        },
        placeholders: {
          name: "તમારું પૂરું નામ દાખલ કરો",
          mobile: "તમારો 10-અંકનો મોબાઈલ નંબર દાખલ કરો",
          village: "તમારા ગામનું નામ દાખલ કરો",
          location: "GPS કોઓર્ડિનેટ્સ અથવા લેન્ડમાર્ક (વૈકલ્પિક)",
          landSize: "દા.ત. 10.5",
          substationName: "નજીકના સબસ્ટેશનનું નામ દાખલ કરો",
          substationDistance: "દા.ત. 2.5",
          rate: "દા.ત. 200000",
        },
      },
      company: {
        title: "સોલર કંપની માહિતી",
        fields: {
          contactName: "સંપર્ક વ્યક્તિનું નામ",
          companyName: "કંપનીનું નામ",
          mobile: "મોબાઈલ નંબર",
          email: "ઈમેલ",
          district: "પસંદગીનો જિલ્લો",
          taluka: "પસંદગીનો તાલુકો",
          landSize: "જરૂરી જમીનનું કદ (એકરમાં)",
          requirements: "અન્ય જરૂરિયાતો",
          budget: "અંદાજિત બજેટ",
          timeline: "સમયરેખા",
          option: "વિકલ્પ",
        },
        options: {
          buy: "ખરીદવા માંગુ છું",
          lease: "ભાડે લેવા માંગુ છું",
        },
        placeholders: {
          contactName: "સંપર્ક વ્યક્તિનું પૂરું નામ દાખલ કરો",
          companyName: "તમારી કંપનીનું પૂરું નામ દાખલ કરો",
          mobile: "તમારો 10-અંકનો મોબાઈલ નંબર દાખલ કરો",
          email: "તમારો ઈમેલ એડ્રેસ દાખલ કરો",
          landSize: "દા.ત. 100",
          requirements: "તમારી જરૂરિયાતો વિશે વિગતવાર માહિતી આપો",
          budget: "દા.ત. ₹2 કરોડ",
          timeline: "દા.ત. 6 મહિના",
        },
      },
    },
    userTypes: {
      landowner: "હું જમીન માલિક છું",
      solarCompany: "હું સોલર કંપની છું",
    },
    notices: {
      important: "મહત્વપૂર્ણ",
      substationDistance: "સફળ સોલાર પ્રોજેક્ટ માટે, સબસ્ટેશનથી તમારી જમીન 10 કિમી થી ઓછા અંતરે હોવી જોઈએ.",
      companyHelp: "અમે તમને તમારી જરૂરિયાતો અનુસાર યોગ્ય જમીન શોધવામાં મદદ કરીશું.",
      dataSecurity: "તમારી માહિતી સુરક્ષિત છે",
      dataPrivacy: "તમારી માહિતી ગોપનીય રાખવામાં આવશે અને ફક્ત સોલાર પ્રોજેક્ટ્સ માટે જ ઉપયોગમાં લેવામાં આવશે.",
    },
    buttons: {
      submitLandDetails: "જમીન વિગતો સબમિટ કરો",
      submitCompany: "કંપની વિગતો સબમિટ કરો",
      knowBenefits: "ફાયદાઓ જાણો"
    },
  },
  en: {
    header: {
      title: "Gujarat Renewables",
      subtitle: "For a powerful future of Gujarat",
      tagline: "Powering Gujarat with solar energy"
    },
    navigation: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
    common: {
      submitButton: "Submit",
      thankYou: "Thank You!",
      successMessage: "Your request has been successfully submitted. We will contact you shortly.",
      processing: "Processing...",
    },
    forms: {
      common: {
        subtitle: "Please fill out the form below and we'll get in touch with you.",
        requiredFields: "Required Fields",
        selectDistrict: "Select District",
        selectTaluka: "Select Taluka",
        submitDetails: "Submit Your Details",
        forBoth: "We will get in touch with you.",
      },
      landowner: {
        title: "Land Owner Information",
        fields: {
          name: "Name",
          mobile: "Mobile Number",
          village: "Village",
          district: "District",
          taluka: "Taluka",
          location: "Location (Optional)",
          landSize: "Land Size (in Acres)",
          substationName: "Nearest Substation Name",
          substationDistance: "Distance from Substation (km)",
          option: "Option",
          sellRate: "Selling Rate (₹/Acre)",
          leaseRate: "Lease Rate (₹/Acre/Year)",
          isOwner: "Are you the land owner?",
        },
        options: {
          sell: "Want to Sell",
          lease: "Want to Lease",
          yes: "Yes",
          no: "No",
        },
        placeholders: {
          name: "Enter your full name",
          mobile: "Enter your 10-digit mobile number",
          village: "Enter your village name",
          location: "GPS coordinates or landmark (optional)",
          landSize: "e.g. 10.5",
          substationName: "Enter nearest substation name",
          substationDistance: "e.g. 2.5",
          rate: "e.g. 200000",
        },
      },
      company: {
        title: "Solar Company Information",
        fields: {
          contactName: "Contact Person Name",
          companyName: "Company Name",
          mobile: "Mobile Number",
          email: "Email",
          district: "Preferred District",
          taluka: "Preferred Taluka",
          landSize: "Required Land Size (in Acres)",
          requirements: "Other Requirements",
          budget: "Estimated Budget",
          timeline: "Timeline",
          option: "Option",
        },
        options: {
          buy: "Want to Buy",
          lease: "Want to Lease",
        },
        placeholders: {
          contactName: "Enter contact person's full name",
          companyName: "Enter your company's full name",
          mobile: "Enter your 10-digit mobile number",
          email: "Enter your email address",
          landSize: "e.g. 100",
          requirements: "Provide detailed information about your requirements",
          budget: "e.g. ₹2 Crore",
          timeline: "e.g. 6 months",
        },
      },
    },
    userTypes: {
      landowner: "I am a Land Owner",
      solarCompany: "I am a Solar Company",
    },
    notices: {
      important: "Important",
      substationDistance: "For a successful solar project, your land should be within 10 km of a substation.",
      companyHelp: "We will help you find suitable land according to your requirements.",
      dataSecurity: "Your information is secure",
      dataPrivacy: "Your data will be kept confidential and only used for solar project purposes.",
    },
    buttons: {
      submitLandDetails: "Submit Land Details",
      submitCompany: "Submit Company Details",
      knowBenefits: "Know Benefits"
    },
  },
}; 